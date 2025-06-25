import { createDriver } from '../support/webdriver.js'
import LoginPage from '../pages/login.page.js'
import { expect } from 'chai';
import fs from 'fs';

let driver;
let loginPage;

describe('Login Feature', function () {
  this.timeout(10000);

  before(async () => {
    driver = createDriver();
    loginPage = new LoginPage(driver);
  });

  after(async () => {
    // ✅ Screenshot (opsional)
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('screenshot.png', screenshot, 'base64');

    // ✅ Delay agar kamu bisa lihat proses login
    await new Promise(resolve => setTimeout(resolve, 5000));

    // ✅ Tutup browser setelah delay
    await driver.quit();
  });

  it('Given I open the SauceDemo login page', async () => {
    await loginPage.open();
  });

  it('When I enter valid credentials', async () => {
    await loginPage.enterCredentials('standard_user', 'secret_sauce');
  });

  it('And I click the login button', async () => {
    await loginPage.clickLogin();
  });

  it('Then I should be redirected to the inventory page', async () => {
    const success = await loginPage.isLoggedIn();
    expect(success).to.be.true;
  });
});
