import { createDriver } from '../support/webdriver.js';
import CheckoutPage from '../pages/checkout.page.js';
import { expect } from 'chai';
import { By } from 'selenium-webdriver';

let driver;
let checkoutPage;

describe('Product Checkout Feature', function () {
  this.timeout(20000);

  beforeEach(async () => {
    driver = createDriver();
    checkoutPage = new CheckoutPage(driver);
    await checkoutPage.login('standard_user', 'secret_sauce');
  });

  afterEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.quit();
  });

  // --- Positive Scenario ---
  it('Successful checkout with single product', async () => {
    await checkoutPage.addFirstProductToCart();
    await checkoutPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillCheckoutInfo('Test', 'User', '12345');
    await checkoutPage.finishCheckout();
    const isComplete = await checkoutPage.isOrderComplete();
    expect(isComplete).to.be.true;
  });

  // --- Negative: all fields empty
  it('Checkout with empty information fails', async () => {
    await checkoutPage.addFirstProductToCart();
    await checkoutPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.tryContinueWithoutInfo();
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg.toLowerCase()).to.include('required');
  });

  // --- Negative: checkout with empty cart shows info page (by SauceDemo design)
  it('Checkout with empty cart still shows info page (by SauceDemo design)', async () => {
    await checkoutPage.openCart();
    await checkoutPage.startCheckout();
    // Validasi field first name dan heading form muncul
    const isFormVisible = await checkoutPage.isCheckoutInfoFormVisible();
    expect(isFormVisible).to.be.true;
  });

  // --- Negative: first name empty
  it('Checkout with empty first name fails', async () => {
    await checkoutPage.addFirstProductToCart();
    await checkoutPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillCheckoutInfo('', 'User', '12345'); // First name empty
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg.toLowerCase()).to.include('first name');
  });

  // --- Negative: last name empty
  it('Checkout with empty last name fails', async () => {
    await checkoutPage.addFirstProductToCart();
    await checkoutPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillCheckoutInfo('Test', '', '12345'); // Last name empty
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg.toLowerCase()).to.include('last name');
  });

  // --- Negative: postal code empty
  it('Checkout with empty postal code fails', async () => {
    await checkoutPage.addFirstProductToCart();
    await checkoutPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillCheckoutInfo('Test', 'User', ''); // Postal code empty
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg.toLowerCase()).to.include('postal code');
  });
});
