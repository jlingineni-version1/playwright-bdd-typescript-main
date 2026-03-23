import { Page } from '@playwright/test';

export class MapHelper {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForMapToLoad(timeoutMs = 100000, pollingIntervalMs = 2000): Promise<void> {
    const start = Date.now();

    // First ensure the map container and canvas are visible (shorter per-check timeout)
    const visibleTimeout = Math.min(10000, timeoutMs);
    await this.page.waitForSelector('[data-testid="map"]', { state: 'visible', timeout: visibleTimeout });
    await this.page.waitForSelector('[data-testid="map-canvas"]', { state: 'visible', timeout: visibleTimeout });

    // Helper that evaluates whether the map is ready in the page context
    const isMapReady = async (): Promise<boolean> => {
      return this.page.evaluate(() => {
        const map = document.querySelector('[data-testid="map"]');
        const canvas = document.querySelector('[data-testid="map-canvas"]') as HTMLCanvasElement | null;
        const tilesLoaded = map?.getAttribute('data-map-tiles-loaded') === 'true';
        const canvasRendered = !!canvas && canvas.width > 0 && canvas.height > 0;
        return !!tilesLoaded && !!canvasRendered;
      });
    };

    // Poll until the map is ready or timeout is reached
    while (true) {
      try {
        if (await isMapReady()) break;
      } catch (err) {
        // ignore transient evaluation errors and continue polling until timeout
      }

      if (Date.now() - start > timeoutMs) {
        throw new Error(`waitForMapToLoad timed out after ${timeoutMs} ms`);
      }

      await this.page.waitForTimeout(pollingIntervalMs);
    }

    // Wait for network to settle before proceeding (respect remaining timeout)
    const remaining = Math.max(0, timeoutMs - (Date.now() - start));
    await this.page.waitForLoadState('networkidle', { timeout: remaining });
  }
}