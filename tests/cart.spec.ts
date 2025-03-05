import { test, expect } from "@playwright/test";

const detailURL = "http://localhost:3000/product/SMG-S24U";

const cartURL = "http://localhost:3000/cart";

test.beforeEach(async ({ page }) => {
  await page.goto(`${detailURL}?storage=512+GB&color=%23FFFF00`);

  await page.getByRole("button", { name: "Add to cart" }).click();

  expect(await page.getByRole("link", { name: "bag" })).toContainText("1");

  await page.waitForURL(cartURL);

  await page.waitForTimeout(500);
});

test("should update price when a new product is added", async ({ page }) => {
  const price = await page.getByTestId("cart-price");

  expect(price).toHaveText("1329 EUR");
});

test("should have cart title", async ({ page }) => {
  await page.goto(cartURL);

  await page.waitForTimeout(500);

  expect(await page.getByRole("heading", { name: "Cart (1)" })).toContainText(
    "1"
  );
});

test("should have a one product in the cart", async ({ page }) => {
  const container = await page.getByTestId("cart-list").getByRole("article");
  expect(container).toHaveCount(1);
});

test("should remove product from the cart", async ({ page }) => {
  await page.getByRole("button", { name: "Remove" }).click();

  expect(await page.getByRole("heading", { name: "Cart (0)" })).toContainText(
    "0"
  );
});

test('should redirect to list of products when "continue shopping" is clicked', async ({
  page,
}) => {
  await page.getByRole("link", { name: "Continue shopping" }).click();

  await page.waitForURL("http://localhost:3000/");
});

test("pay button must be disabled when the cart is empty", async ({ page }) => {
  await page.getByRole("button", { name: "Remove" }).click();

  expect(await page.getByRole("button", { name: "Pay" })).toBeDisabled();
});

test("price must be updated when the product is removed", async ({ page }) => {
  const price = await page.getByTestId("cart-price");

  await page.getByRole("button", { name: "Remove" }).click();

  expect(price).toHaveText("0 EUR");
});
