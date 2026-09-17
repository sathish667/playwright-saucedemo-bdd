const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('SauceDemo E2E Tests', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
  });

  test('Complete purchase flow - Happy Path', async () => {
    const productName = 'Sauce Labs Backpack';

    // 1. Authentication
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.title).toHaveText('Products');

    // 2. Select Product & Navigate to Cart
    await inventoryPage.addProductToCart(productName);
    await inventoryPage.goToCart();

    // 3. Verify Item in Cart
    await expect(cartPage.getItemLocatorByName(productName)).toBeVisible();
    await cartPage.proceedToCheckout();

    // 4. Fill Checkout Information & Finish Order
    await checkoutPage.fillInformation('Alex', 'Doe', '641001');
    await checkoutPage.completePurchase();

    // 5. Assert Order Confirmation
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('Error state - Locked out user cannot log in', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});