class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async addProductToCart(productItemName) {
    const formattedName = productItemName.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="add-to-cart-${formattedName}"]`).click();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }
}

module.exports = { InventoryPage };