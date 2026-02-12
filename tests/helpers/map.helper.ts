import { Page } from '@playwright/test';

export class MapHelper {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForMapToLoad(): Promise<void> {
    // Wait for map container and canvas to be visible
    await this.page.waitForSelector('[data-testid="map"]', { state: 'visible' });
    await this.page.waitForSelector('[data-testid="map-canvas"]', { state: 'visible' });

    // Wait for the 'data-map-tiles-loaded="true"' attribute to be set on the map element
    await this.page.waitForFunction(
      () => {
        const mapElement = document.querySelector('[data-testid="map"]');
        return mapElement?.getAttribute('data-map-tiles-loaded') === 'true';
      },
      { timeout: 30000, pollingInterval: 500 } // Check every 500ms for 30 seconds
    );

    // Wait for network requests to settle (networkidle)
    await this.page.waitForLoadState('networkidle');

    // Ensure canvas is rendered with non-zero size
    await this.page.waitForFunction(() => {
      const canvas = document.querySelector('[data-testid="map-canvas"]') as HTMLCanvasElement | null;
      return canvas && canvas.width > 0 && canvas.height > 0;
    }, { timeout: 15000, pollingInterval: 500 }); // Check every 500ms for 15 seconds
  }
}
