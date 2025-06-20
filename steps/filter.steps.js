import { createDriver } from '../support/webdriver.js';
import FilterPage from '../pages/filter.page.js';
import { expect } from 'chai';

let driver;
let filterPage;

describe('Product Filtering Feature', function () {
  this.timeout(10000);

  before(async () => {
    driver = createDriver();
    filterPage = new FilterPage(driver);
    await filterPage.login('standard_user', 'secret_sauce');
  });

  after(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.quit();
  });

  it('Filter products by Name (A to Z)', async () => {
    await filterPage.selectSort('A to Z');
    const sorted = await filterPage.verifySortedByNameAsc();
    expect(sorted).to.be.true;
  });

  it('Filter products by Name (Z to A)', async () => {
    await filterPage.selectSort('Z to A');
    const sorted = await filterPage.verifySortedByNameDesc();
    expect(sorted).to.be.true;
  });

  it('Filter products by Price (Low to High)', async () => {
    await filterPage.selectSort('Low to High');
    const sorted = await filterPage.verifySortedByPriceAsc();
    expect(sorted).to.be.true;
  });

  it('Filter products by Price (High to Low)', async () => {
    await filterPage.selectSort('High to Low');
    const sorted = await filterPage.verifySortedByPriceDesc();
    expect(sorted).to.be.true;
  });
});
