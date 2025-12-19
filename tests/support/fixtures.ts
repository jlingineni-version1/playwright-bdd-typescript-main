import { test as base } from 'playwright-bdd';
import { HomePage } from '../pages/HomePage';
import { ConnectivityToolPage } from '../pages/ConnectivityToolPage';
import { FeedbackPage } from '../pages/FeedbackPage';
import { CurrentSelectionPage } from '../pages/CurrentSelectionPage';
import {MapTilePage} from '../pages/MapTilerPage';

type Fixtures = {
  homePage: HomePage;
  connectivityToolPage: ConnectivityToolPage;
  feedbackPage: FeedbackPage;
  currentSelectionPage: CurrentSelectionPage;
  mapTilePage: MapTilePage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  connectivityToolPage: async ({ page }, use) => {
    const connectivityToolPage = new ConnectivityToolPage(page);
    await use(connectivityToolPage);
  },

  feedbackPage: async ({ page }, use) => {
    const feedbackPage = new FeedbackPage(page);
    await use(feedbackPage);
  },

  currentSelectionPage: async ({ page }, use) => {
    const currentSelectionPage = new CurrentSelectionPage(page);
    await use(currentSelectionPage);
  },

  mapTilePage: async ({ page }, use) => {
    const mapTilePage = new MapTilePage(page);
    await use(mapTilePage);
  },

});
