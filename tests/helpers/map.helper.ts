import { Page } from '@playwright/test';

export class MapHelper {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForMapToLoad(): Promise<void> {
    // Wait for map container
    await this.page.waitForSelector('[data-testid="map-canvas"]', {
      state: 'visible',
    });

    // Wait for all network requests to settle
    await this.page.waitForLoadState('networkidle');

    // Ensure canvas is rendered
    await this.page.waitForFunction(() => {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement | null;
      return !!canvas && canvas.width > 0 && canvas.height > 0;
    });
  }
}
