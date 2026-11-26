import { expect, type Page } from '@playwright/test';
import { Buffer } from 'buffer';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { MapHelper } from './map.helper';

const KNOWN_TOKENS = [
  'chromium',
  'firefox',
  'webkit',
  'win32',
  'windows',
  'linux',
  'darwin',
  'mac',
  'macos',
];

function canonicalizeSnapshotName(name: string) {
  if (!name) return name;
  // Remove extension if present, we'll normalize to .png at the end
  const withoutExt = name.replace(/\.png$/i, '');

  // Split on dashes and underscores, filter out known platform/browser tokens
  const parts = withoutExt.split(/[-_]/).filter((p) => {
    const lower = p.toLowerCase();
    return !KNOWN_TOKENS.includes(lower);
  });
  const base = parts.join('-') || withoutExt;
  return base.endsWith('.png') ? base : `${base}.png`;
}

export class VisualSnapshotHelper {
  static visualOptions = {
    maxDiffPixelRatio: 0.005,
    maxDiffPixels: 25,
  };

  static canvasOptions = {
    maxDiffPixelRatio: 0.02,
    maxDiffPixels: 150,
  };

  // Impact area map renders can vary due map tile/label jitter while route geometry remains valid.
  static impactAreaCanvasOptions = {
    maxDiffPixelRatio: 0.12,
    maxDiffPixels: 60000,
    threshold: 0.3,
  };

  /**
   * Compare a screenshot buffer to a canonical snapshot filename.
   * This will normalize names (strip browser/OS tokens) so CI and local
   * environments don't create different snapshot names.
   *
   * Usage: pass a simple stable name like `connectivity-tool-map` or
   * `connectivity-tool-map.png` and the helper will canonicalize it.
   */
  static async compareScreenshot(screenshot: Buffer, snapshotName: string) {
    const canonical = canonicalizeSnapshotName(snapshotName);
    // Pre-validate expected snapshot file is a PNG when present to give clearer CI errors
    try {
      const lookup = await findExpectedSnapshotPath(canonical);
      if (lookup.foundPath) {
        const expectedPath = lookup.foundPath;
        const fd = await fsp.open(expectedPath, 'r');
        const buf = Buffer.alloc(8);
        await fd.read(buf, 0, 8, 0);
        await fd.close();
        const pngSig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
        if (!buf.equals(pngSig)) {
          throw new Error(`Expected snapshot file ${expectedPath} is not a valid PNG (magic: ${buf.toString('hex')}). Check .features-gen generation / normalize step.`);
        }
      } else if (lookup.candidates && lookup.candidates.length > 0) {
        // No valid PNG found; prepare a helpful error listing candidates and their signatures
        const lines = lookup.candidates.map(c => `- ${c.path} (magic: ${c.magic}, sample: ${c.sampleText})`);
        throw new Error(`No valid PNG snapshot found for ${canonical}. Candidates found but none were valid PNGs:\n${lines.join('\n')}\nCheck .features-gen generation / normalize step.`);
      }
    } catch (err) {
      // If we hit an IO error or the pre-check failed, rethrow with context so CI logs are helpful
      if (err instanceof Error) throw err;
      throw new Error(String(err));
    }
    await expect(screenshot).toMatchSnapshot(canonical, this.visualOptions);
  }

  static async compareCanvasScreenshot(screenshot: Buffer, snapshotName: string) {
    const canonical = canonicalizeSnapshotName(snapshotName);
    await expect(screenshot).toMatchSnapshot(canonical, this.canvasOptions);
  }

  static async compareImpactAreaCanvasScreenshot(screenshot: Buffer, snapshotName: string) {
    const canonical = canonicalizeSnapshotName(snapshotName);
    await expect(screenshot).toMatchSnapshot(canonical, this.impactAreaCanvasOptions);
  }

  static async takeScreenshot(page: Page): Promise<Buffer> {
    return await page.screenshot();
  }

  static async takeConnectivityToolFullPageScreenshot(page: Page): Promise<Buffer> {
    await page.waitForSelector('text="Filter map"', { state: 'visible', timeout: 30000 });
    // Resizing grows the map container, which triggers a MapLibre resize and new tile loads;
    // a ready flag left over from before the resize must not be trusted.
    await new MapHelper(page).waitForMapIdleAfter(() => page.setViewportSize({ width: 1920, height: 1080 }));

    const scrollbarMask = await page.addStyleTag({
      content: `
                html, body {
                    scrollbar-width: none !important;
                    -ms-overflow-style: none !important;
                }

                html::-webkit-scrollbar,
                body::-webkit-scrollbar,
                .sidebar-scrollable::-webkit-scrollbar,
                .svelte-1z0x0::-webkit-scrollbar {
                    display: none !important;
                }

                .sidebar-scrollable,
                .sidebar-scrollable.svelte-1z0x0,
                .svelte-1z0x0 {
                    scrollbar-width: none !important;
                    -ms-overflow-style: none !important;
                    overflow-y: hidden !important;
                }
            `,
    });

    try {
      return await page.screenshot({ fullPage: true });
    } finally {
      await scrollbarMask.evaluate((node) => node.parentNode?.removeChild(node));
    }
  }

  static async connectivityToolFullPageScreenshot(screenshot: Buffer, snapshotName: string) {
    const canonical = canonicalizeSnapshotName(snapshotName);
    // See compareScreenshot for validation
    try {
      const lookup = await findExpectedSnapshotPath(canonical);
      if (lookup.foundPath) {
        const expectedPath = lookup.foundPath;
        const fd = await fsp.open(expectedPath, 'r');
        const buf = Buffer.alloc(8);
        await fd.read(buf, 0, 8, 0);
        await fd.close();
        const pngSig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
        if (!buf.equals(pngSig)) {
          throw new Error(`Expected snapshot file ${expectedPath} is not a valid PNG (magic: ${buf.toString('hex')}). Check .features-gen generation / normalize step.`);
        }
      } else if (lookup.candidates && lookup.candidates.length > 0) {
        const lines = lookup.candidates.map(c => `- ${c.path} (magic: ${c.magic}, sample: ${c.sampleText})`);
        throw new Error(`No valid PNG snapshot found for ${canonical}. Candidates found but none were valid PNGs:\n${lines.join('\n')}\nCheck .features-gen generation / normalize step.`);
      }
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(String(err));
    }
    await expect(screenshot).toMatchSnapshot(canonical, this.visualOptions);
  }
}

type Candidate = { path: string; magic: string; sampleText: string };

async function findExpectedSnapshotPath(canonicalName: string): Promise<{ foundPath?: string | null; candidates: Candidate[] }> {
  const roots = [path.resolve(process.cwd(), '.features-gen'), path.resolve(process.cwd(), 'test-results')];
  const target = canonicalName;
  const base = canonicalName.replace(/\.png$/i, '');
  const candidates: Candidate[] = [];

  for (const r of roots) {
    try { await fsp.access(r); } catch { continue; }
    // Walk tree and collect/check candidates; return early if a valid PNG is found
    let foundPath: string | undefined;
    async function inner(dir: string) {
      let entries: fs.Dirent[];
      try { entries = await fsp.readdir(dir, { withFileTypes: true }); } catch { return; }
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await inner(full);
          if (foundPath) return;
        } else if (entry.isFile()) {
          const name = entry.name;
          if (name === target || (name.toLowerCase().endsWith('.png') && name.toLowerCase().includes(base.toLowerCase()))) {
            try {
              const fd = await fsp.open(full, 'r');
              const buf = Buffer.alloc(8);
              await fd.read(buf, 0, 8, 0);
              await fd.close();
              const magic = buf.toString('hex');
              const pngSig = '89504e470d0a1a0a';
              if (magic === pngSig) { foundPath = full; return; }
              let sample = '';
              try { sample = (await fsp.readFile(full, 'utf8')).slice(0, 200).replace(/\s+/g, ' '); } catch { sample = '<binary or unreadable>'; }
              candidates.push({ path: full, magic, sampleText: sample });
            } catch {
              candidates.push({ path: full, magic: '<io-error>', sampleText: '' });
            }
          }
        }
      }
    }
    await inner(r);
    if (foundPath) return { foundPath, candidates };
  }
  return { foundPath: null, candidates };
}