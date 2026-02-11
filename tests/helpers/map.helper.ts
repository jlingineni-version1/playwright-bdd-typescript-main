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
      { timeout: 80000 } // You can adjust the timeout duration as needed
    );

    // Wait for all network requests to settle
    await this.page.waitForLoadState('networkidle');

    // Ensure canvas is rendered
    await this.page.waitForFunction(() => {
      const canvas = document.querySelector('[data-testid="map-canvas"]') as HTMLCanvasElement | null;
      return !!canvas && canvas.width > 0 && canvas.height > 0;
    });
  }
}
