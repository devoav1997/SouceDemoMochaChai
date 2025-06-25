import { By, until } from '../support/webdriver.js';
import CartPage from './cart.page.js';

export default class CheckoutPage extends CartPage {
  constructor(driver) {
    super(driver);
    this.checkoutBtn = By.id('checkout');
    this.firstNameField = By.id('first-name');
    this.lastNameField = By.id('last-name');
    this.postalCodeField = By.id('postal-code');
    this.continueBtn = By.id('continue');
    this.finishBtn = By.id('finish');
    this.completeHeader = By.css('.complete-header');
    this.errorMsg = By.css('[data-test="error"]');
    this.title = By.className('title');
    this.cartItems = By.className('cart_item');
  }

async startCheckout() {
  await this.driver.wait(until.elementLocated(this.checkoutBtn), 5000);
  const checkoutBtnEl = await this.driver.findElement(this.checkoutBtn);
  await checkoutBtnEl.click();
    await this.driver.wait(until.elementLocated(this.firstNameField), 5000);
  

}


  async fillCheckoutInfo(first, last, postal) {
    await this.driver.findElement(this.firstNameField).clear();
    await this.driver.findElement(this.lastNameField).clear();
    await this.driver.findElement(this.postalCodeField).clear();

    await this.driver.findElement(this.firstNameField).sendKeys(first);
    await this.driver.findElement(this.lastNameField).sendKeys(last);
    await this.driver.findElement(this.postalCodeField).sendKeys(postal);
    await this.driver.findElement(this.continueBtn).click();

    if (first && last && postal) {
      await this.driver.wait(until.elementLocated(this.finishBtn), 5000);
    } else {
      await this.driver.wait(until.elementLocated(this.errorMsg), 5000);
    }
  }

  async tryContinueWithoutInfo() {
    await this.driver.findElement(this.continueBtn).click();
    await this.driver.wait(until.elementLocated(this.errorMsg), 5000);
  }

  async finishCheckout() {
    await this.driver.findElement(this.finishBtn).click();
    await this.driver.wait(until.elementLocated(this.completeHeader), 5000);
  }

  async isOrderComplete() {
    try {
      const header = await this.driver.findElement(this.completeHeader);
      const text = await header.getText();
      return text.toLowerCase().includes('thank you');
    } catch {
      return false;
    }
  }

  async getErrorMessage() {
    const error = await this.driver.findElement(this.errorMsg);
    return await error.getText();
  }

  async isCheckoutInfoFormVisible() {
    // Mengecek field first name dan judul form "Checkout: Your Information"
    const field = await this.driver.findElement(this.firstNameField);
    const tag = await field.getTagName();
    const title = await this.driver.findElement(this.title);
    const text = await title.getText();
    return tag === 'input' && text.toLowerCase().includes('your information');
  }
}
