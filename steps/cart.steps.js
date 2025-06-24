import { createDriver } from '../support/webdriver.js';
import CartPage from '../pages/cart.page.js';
import { expect } from 'chai';

let driver;
let cartPage;

describe('Add Product to Cart Feature', function () {
  this.timeout(20000);

  beforeEach(async () => {
    driver = createDriver();
    cartPage = new CartPage(driver);
    await cartPage.login('standard_user', 'secret_sauce');
  });

  afterEach(async () => {
    // Delay 3 detik agar hasil Add to Cart terlihat sebelum browser close
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.quit();
});

  // --- Positive Scenarios ---
  it('Add first product to cart and verify cart badge', async () => {
    await cartPage.addFirstProductToCart();
    const count = await cartPage.getCartCount();
    expect(count).to.equal(1);
  });

  it('View cart and verify product is in the cart', async () => {
    await cartPage.addFirstProductToCart();
    await cartPage.openCart();
    const names = await cartPage.getCartItemNames();
    expect(names).to.be.an('array').that.is.not.empty;
  });

  // --- Negative Scenarios ---
  it('Cart badge remains zero when no product is added', async () => {
    const count = await cartPage.getCartCount();
    expect(count === 0 || isNaN(count)).to.be.true;
  });

  it('Cart is empty when no product is added', async () => {
    await cartPage.openCart();
    const names = await cartPage.getCartItemNames();
    expect(names.length).to.equal(0);
  });

  it('Remove product from cart makes cart empty', async () => {
    await cartPage.addFirstProductToCart();
    await cartPage.openCart();
    await cartPage.removeFirstProductFromCart();
    const names = await cartPage.getCartItemNames();
    const count = await cartPage.getCartCount();
    expect(names.length).to.equal(0);
    expect(count === 0 || isNaN(count)).to.be.true;
  });
});
