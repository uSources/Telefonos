import { test, expect } from "@playwright/test";

const detailURL = "/product/SMG-S24U";

const cartURL = "/cart";

test.beforeEach(async ({ page }) => {
  await page.goto(`${detailURL}?storage=512+GB&color=Titanium+Yellow`);

  const cartButton = page.getByRole("button", { name: "Add to cart" });

  await cartButton.click();

  const cartLink = await page.getByRole("link", { name: "bag" });

  await expect(cartLink).toContainText("1");

  await page.waitForURL(cartURL);
});

test("should update price when a new product is added", async ({ page }) => {
  const price = page.getByTestId("cart-price");

  await expect(price).toHaveText("1329 EUR");
});

test("should have cart title", async ({ page }) => {
  const title = page.getByRole("heading", { name: "Cart (1)" });

  await expect(title).toContainText("1");
});

test("should have a one product in the cart", async ({ page }) => {
  const container = page.getByTestId("cart-list").getByRole("article");

  await expect(container).toHaveCount(1);
});

test("should remove product from the cart", async ({ page }) => {
  const removeButton = page.getByRole("button", { name: "Remove" });

  await removeButton.click();

  const heading = page.getByRole("heading", { name: "Cart (0)" });

  await expect(heading).toContainText("0");
});

test('should redirect to list of products when "continue shopping" is clicked', async ({
  page,
}) => {
  const continueShopping = page.getByRole("link", {
    name: "Continue shopping",
  });

  await continueShopping.click();

  await page.waitForURL("/");
});

test("pay button must be disabled when the cart is empty", async ({ page }) => {
  const removeButton = page.getByRole("button", { name: "Remove" });

  await removeButton.click();

  const playButton = page.getByRole("button", { name: "Pay" });

  await expect(playButton).toBeDisabled();
});

test("price must be updated when the product is removed", async ({ page }) => {
  const price = await page.getByTestId("cart-price");

  const removeButton = page.getByRole("button", { name: "Remove" });

  await removeButton.click();

  await expect(price).toHaveText("0 EUR");
});
