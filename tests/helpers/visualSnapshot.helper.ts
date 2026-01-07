import { expect } from '@playwright/test';
import { Buffer } from 'buffer';

export class VisualSnapshotHelper {
  static async compareScreenshot(
    screenshot: Buffer,
    snapshotName: string
  ) {
    await expect(screenshot).toMatchSnapshot(snapshotName, {
      maxDiffPixelRatio: 0.2,
      maxDiffPixels: 200000,
    });
  }

  static async compareCanvasScreenshot(
    screenshot: Buffer,
    snapshotName: string
  ) {
    await expect(screenshot).toMatchSnapshot(snapshotName, {
      maxDiffPixelRatio: 0.2,
      maxDiffPixels: 200000,
    });
  }

  static async connectivityToolFullPageScreenshot(
    screenshot: Buffer,
    snapshotName: string
    ) {
      await expect(screenshot).toMatchSnapshot(snapshotName, {
      maxDiffPixelRatio: 0.2,
      maxDiffPixels: 200000,
    });
  }
}