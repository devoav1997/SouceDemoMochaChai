import { createDriver } from '../support/webdriver.js';

const driver = createDriver();

await driver.get('https://www.saucedemo.com/');
await new Promise(r => setTimeout(r, 5000)); // biar kamu lihat browser terbuka
await driver.quit();
