import { By, until } from '../support/webdriver.js';
import LoginPage from './login.page.js';

export default class CartPage extends LoginPage {
  constructor(driver) {
    super(driver);
    this.addToCartBtn = By.css('.inventory_item button');
    this.cartBadge = By.className('shopping_cart_badge');
    this.cartIcon = By.className('shopping_cart_link');
    this.cartItems = By.className('cart_item');
    this.removeBtn = By.css('.cart_button'); // tombol Remove di halaman cart
  }

  async addFirstProductToCart() {
    await this.driver.wait(until.elementLocated(this.addToCartBtn), 5000);
    const btn = await this.driver.findElement(this.addToCartBtn);
    await btn.click();
  }

  async openCart() {
    await this.driver.findElement(this.cartIcon).click();
    await this.driver.wait(until.elementLocated(By.className('cart_contents_container')), 5000);
  }

  async getCartCount() {
    try {
      const badge = await this.driver.findElement(this.cartBadge);
      return parseInt(await badge.getText(), 10);
    } catch {
      return 0;
    }
  }

  async getCartItemNames() {
    const items = await this.driver.findElements(this.cartItems);
    const names = [];
    for (const item of items) {
      const name = await item.findElement(By.className('inventory_item_name'));
      names.push(await name.getText());
    }
    return names;
  }

  async removeFirstProductFromCart() {
    // Tunggu tombol Remove ada
    await this.driver.wait(until.elementLocated(this.removeBtn), 5000);
    const btn = await this.driver.findElement(this.removeBtn);
    await btn.click();
    // Tunggu hingga cart kosong
    await this.driver.wait(async () => {
      const items = await this.driver.findElements(this.cartItems);
      return items.length === 0;
    }, 5000);
    // Tambahan delay kecil agar badge hilang
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}
