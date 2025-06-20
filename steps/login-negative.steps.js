import { createDriver } from '../support/webdriver.js'
import LoginPage from '../pages/login.page.js'
import { expect } from 'chai';

let driver;
let loginPage;

describe('Negative Login Scenarios', function () {
  this.timeout(10000);

  beforeEach(async () => {
    driver = createDriver();
    loginPage = new LoginPage(driver);
    await loginPage.open();
  });

  afterEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    await driver.quit();
  });

  it('should show error when username is missing', async () => {
    await loginPage.enterCredentials('', 'secret_sauce');
    await loginPage.clickLogin();
    const error = await loginPage.getErrorMessage();
    expect(error).to.include('Username is required');
  });

  it('should show error when password is missing', async () => {
    await loginPage.enterCredentials('standard_user', '');
    await loginPage.clickLogin();
    const error = await loginPage.getErrorMessage();
    expect(error).to.include('Password is required');
  });

  it('should show error when credentials are invalid', async () => {
    await loginPage.enterCredentials('invalid_user', 'wrong_pass');
    await loginPage.clickLogin();
    const error = await loginPage.getErrorMessage();
    expect(error).to.include('Username and password do not match');
  });
});
