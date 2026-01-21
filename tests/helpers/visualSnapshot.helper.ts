import { expect } from '@playwright/test';
import { Buffer } from 'buffer';

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
    await expect(screenshot).toMatchSnapshot(canonical, this.defaultOptions);
  }

  static async compareCanvasScreenshot(screenshot: Buffer, snapshotName: string) {
    const canonical = canonicalizeSnapshotName(snapshotName);
    await expect(screenshot).toMatchSnapshot(canonical, this.defaultOptions);
  }

  static async connectivityToolFullPageScreenshot(screenshot: Buffer, snapshotName: string) {
    const canonical = canonicalizeSnapshotName(snapshotName);
    await expect(screenshot).toMatchSnapshot(canonical, this.defaultOptions);
  }
}