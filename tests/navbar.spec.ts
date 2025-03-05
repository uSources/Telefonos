import { test, expect } from "@playwright/test";

const homeURL = "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(homeURL);
});

test("has logo", async ({ page }) => {
  expect(await page.getByRole("link", { name: "logo" })).toBeVisible();
});

test("logo redirect to home page", async ({ page }) => {
  await page.getByRole("link", { name: "logo" }).click();

  await page.waitForURL("http://localhost:3000/");
});

test("has cart button", async ({ page }) => {
  expect(await page.getByRole("link", { name: "bag" })).toBeVisible();
});

test("cart button redirect to cart page", async ({ page }) => {
  await page.getByRole("link", { name: "bag" }).click();

  await page.waitForURL("http://localhost:3000/cart");
});
