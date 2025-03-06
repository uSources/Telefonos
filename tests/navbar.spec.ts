import { test, expect } from "@playwright/test";

const homeURL = "/";

test.beforeEach(async ({ page }) => {
  await page.goto(homeURL);
});

test("has logo", async ({ page }) => {
  const logo = await page.getByRole("link", { name: "logo" });

  await expect(logo).toBeVisible();
});

test("logo redirect to home page", async ({ page }) => {
  const logo = await page.getByRole("link", { name: "logo" });

  await logo.click();

  await page.waitForURL("/");
});

test("has cart button", async ({ page }) => {
  const cartButton = await page.getByRole("link", { name: "bag" });

  await expect(cartButton).toBeVisible();
});

test("cart button redirect to cart page", async ({ page }) => {
  const cartButton = await page.getByRole("link", { name: "bag" });

  await cartButton.click();

  await page.waitForURL("/cart");
});
