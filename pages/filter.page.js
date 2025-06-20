import { By, until } from '../support/webdriver.js';
import LoginPage from './login.page.js';

export default class FilterPage extends LoginPage {
  constructor(driver) {
    super(driver);
    this.sortDropdown = By.className('product_sort_container');
    this.itemNames = By.className('inventory_item_name');
    this.itemPrices = By.className('inventory_item_price');
  }

  async login(username, password) {
    await this.open();
    await this.enterCredentials(username, password);
    await this.clickLogin();
    await this.driver.wait(until.elementLocated(this.sortDropdown), 5000);
  }

  async selectSort(option) {
    const sortMap = {
      'A to Z': 'az',
      'Z to A': 'za',
      'Low to High': 'lohi',
      'High to Low': 'hilo',
      az: 'az',
      za: 'za',
      lohi: 'lohi',
      hilo: 'hilo'
    };
    const value = sortMap[option] || option;
    await this.driver.executeScript(
      `document.querySelector('.product_sort_container').value = '${value}';
       document.querySelector('.product_sort_container').dispatchEvent(new Event('change', { bubbles: true }));`
    );
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  async getNames() {
    const elements = await this.driver.findElements(this.itemNames);
    const names = [];
    for (const el of elements) {
      names.push(await el.getText());
    }
    return names;
  }

  async getPrices() {
    const elements = await this.driver.findElements(this.itemPrices);
    const prices = [];
    for (const el of elements) {
      const text = await el.getText();
      prices.push(parseFloat(text.replace('$', '')));
    }
    return prices;
  }

  async verifySortedByNameAsc() {
    const names = await this.getNames();
    console.log('🟡 A-Z:', names);
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    return JSON.stringify(names) === JSON.stringify(sorted);
  }

  async verifySortedByNameDesc() {
    const names = await this.getNames();
    console.log('🟠 Z-A:', names);
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    return JSON.stringify(names) === JSON.stringify(sorted);
  }

  async verifySortedByPriceAsc() {
    const prices = await this.getPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    return JSON.stringify(prices) === JSON.stringify(sorted);
  }

  async verifySortedByPriceDesc() {
    const prices = await this.getPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    return JSON.stringify(prices) === JSON.stringify(sorted);
  }
}
