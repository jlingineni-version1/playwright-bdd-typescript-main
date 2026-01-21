import { expect } from '@playwright/test';
import { Buffer } from 'buffer';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as path from 'path';

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
  static defaultOptions = {
    maxDiffPixelRatio: 0.2,
    maxDiffPixels: 200000,
  } as const;

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
      const expectedPath = await findExpectedSnapshotPath(canonical);
      if (expectedPath) {
        const fd = await fsp.open(expectedPath, 'r');
        const buf = Buffer.alloc(8);
        await fd.read(buf, 0, 8, 0);
        await fd.close();
        const pngSig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
        if (!buf.equals(pngSig)) {
          throw new Error(`Expected snapshot file ${expectedPath} is not a valid PNG (magic: ${buf.toString('hex')}). Check .features-gen generation / normalize step.`);
        }
      }
    } catch (err) {
      // If we hit an IO error or the pre-check failed, rethrow with context so CI logs are helpful
      if (err instanceof Error) throw err;
      throw new Error(String(err));
    }
    await expect(screenshot).toMatchSnapshot(canonical, this.defaultOptions);
  }

  static async compareCanvasScreenshot(screenshot: Buffer, snapshotName: string) {
    const canonical = canonicalizeSnapshotName(snapshotName);
    await expect(screenshot).toMatchSnapshot(canonical, this.defaultOptions);
  }

  static async connectivityToolFullPageScreenshot(screenshot: Buffer, snapshotName: string) {
    const canonical = canonicalizeSnapshotName(snapshotName);
    // See compareScreenshot for validation
    try {
      const expectedPath = await findExpectedSnapshotPath(canonical);
      if (expectedPath) {
        const fd = await fsp.open(expectedPath, 'r');
        const buf = Buffer.alloc(8);
        await fd.read(buf, 0, 8, 0);
        await fd.close();
        const pngSig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
        if (!buf.equals(pngSig)) {
          throw new Error(`Expected snapshot file ${expectedPath} is not a valid PNG (magic: ${buf.toString('hex')}). Check .features-gen generation / normalize step.`);
        }
      }
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(String(err));
    }
    await expect(screenshot).toMatchSnapshot(canonical, this.defaultOptions);
  }
}

async function findExpectedSnapshotPath(canonicalName: string) {
  const roots = [path.resolve(process.cwd(), '.features-gen'), path.resolve(process.cwd(), 'test-results')];
  const target = canonicalName;
  async function walk(dir: string): Promise<string | null> {
    let entries: fs.Dirent[];
    try {
      entries = await fsp.readdir(dir, { withFileTypes: true });
    } catch (e) {
      return null;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const found = await walk(full);
        if (found) return found;
      } else if (entry.isFile() && entry.name === target) {
        return full;
      }
    }
    return null;
  }

  for (const r of roots) {
    try {
      await fsp.access(r);
    } catch (e) {
      continue;
    }
    const found = await walk(r);
    if (found) return found;
  }
  return null;
}