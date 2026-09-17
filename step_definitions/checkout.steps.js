const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

let browser, context, page;
let loginPage, inventoryPage, cartPage, checkoutPage;

Before(async function () {
  // Respect HEADLESS environment variable or default to false for local execution
  const isHeadless = process.env.HEADLESS === 'true';
  browser = await chromium.launch({ headless: isHeadless });
  context = await browser.newContext();
  page = await context.newPage();

  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
});

After(async function () {
  await page.close();
  await context.close();
  await browser.close();
});

Given('User is on the SauceDemo login page', async function () {
  await loginPage.goto();
});

When('User logs in with username {string} and password {string}', async function (username, password) {
  await loginPage.login(username, password);
});

When('User adds {string} to the cart', async function (productName) {
  await inventoryPage.addProductToCart(productName);
  await inventoryPage.goToCart();
});

When('User proceeds through checkout with {string}, {string}, and {string}', async function (firstName, lastName, zip) {
  await cartPage.proceedToCheckout();
  await checkoutPage.fillInformation(firstName, lastName, zip);
  await checkoutPage.completePurchase();
});

Then('User should see the confirmation message {string}', async function (expectedMessage) {
  await expect(checkoutPage.completeHeader).toHaveText(expectedMessage);
});