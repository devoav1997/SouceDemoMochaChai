import { Builder, By, until } from 'selenium-webdriver';
import 'chromedriver';

export function createDriver() {
  return new Builder().forBrowser('chrome').build();
}

export { By, until };
