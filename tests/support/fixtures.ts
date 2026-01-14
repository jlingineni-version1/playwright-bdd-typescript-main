import { test as base } from 'playwright-bdd';
import { HomePage } from '../pages/HomePage';
import { ConnectivityToolPage } from '../pages/ConnectivityToolPage';
import { FeedbackPage } from '../pages/FeedbackPage';
import { CurrentSelectionPage } from '../pages/CurrentSelectionPage';
import { MapTilePage } from '../pages/MapTilerPage';
import { OpenStreetMapPage } from '../pages/OpenStreetMapPage';
import { NavigationHelper } from '../helpers/navigatorHelper';
import { MapHelper } from '../helpers/map.helper';


type Fixtures = {
  homePage: HomePage;
  connectivityToolPage: ConnectivityToolPage;
  feedbackPage: FeedbackPage;
  currentSelectionPage: CurrentSelectionPage;
  mapTilePage: MapTilePage;
  openStreetMapPage: OpenStreetMapPage;
  navigationHelper: NavigationHelper;
  mapHelper:MapHelper;
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
  openStreetMapPage: async ({ page }, use) => {
    const openStreetMapPage = new OpenStreetMapPage(page);
    await use(openStreetMapPage);
  },

  navigationHelper: async ({ page }, use) => {
    const navigationHelper = new NavigationHelper(page);
    await use(navigationHelper);
  },

   mapHelper: async ({ page }, use) => {
    const mapHelper = new MapHelper(page);
    await use(mapHelper);
  },

});
