import { By, until } from '../support/webdriver.js';

export default class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://www.saucedemo.com/';
    this.usernameField = By.id('user-name');
    this.passwordField = By.id('password');
    this.loginButton = By.id('login-button');
    this.inventoryContainer = By.id('inventory_container');
    this.errorMessage = By.css('.error-message-container');
  }

  async open() {
    await this.driver.get(this.url);
  }

  async enterCredentials(username, password) {
    const usernameField = await this.driver.findElement(this.usernameField);
    const passwordField = await this.driver.findElement(this.passwordField);

    for (const char of username) {
      await usernameField.sendKeys(char);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    for (const char of password) {
      await passwordField.sendKeys(char);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  async clickLogin() {
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.driver.findElement(this.loginButton).click();
  }

  async isLoggedIn() {
    await this.driver.wait(until.elementLocated(this.inventoryContainer), 5000);
    const currentUrl = await this.driver.getCurrentUrl();
    return currentUrl.includes('inventory');
  }

  async getErrorMessage() {
    const element = await this.driver.findElement(this.errorMessage);
    return await element.getText();
  }
}
