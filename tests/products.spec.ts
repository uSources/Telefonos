import { test, expect } from "@playwright/test";

const homeURL = "/";

test.beforeEach(async ({ page }) => {
  await page.goto(homeURL);
});

test("has searchbar", async ({ page }) => {
  const searchBox = page.getByRole("searchbox", {
    name: "Search for a smartphone...",
  });
  await expect(searchBox).toBeVisible();
});

test("searchbar cross clears value", async ({ page }) => {
  const searchBox = page.getByRole("searchbox", {
    name: "Search for a smartphone...",
  });

  await searchBox.fill("iphone");

  await expect(searchBox).toHaveValue("iphone");

  await page.waitForURL("/?q=iphone");

  const clearButton = page.getByRole("button", { name: "clear" });

  await clearButton.click();

  await expect(searchBox).toHaveValue("");
});

test("searchbar cross clears the search query", async ({ page }) => {
  const searchBox = page.getByRole("searchbox", {
    name: "Search for a smartphone...",
  });

  await searchBox.fill("iphone");

  await page.waitForURL("/?q=iphone");

  const clearButton = page.getByRole("button", { name: "clear" });

  await clearButton.click();

  await page.waitForURL("/?q=");
});

test("searchbar updates the url with the search query", async ({ page }) => {
  const searchBox = page.getByRole("searchbox", {
    name: "Search for a smartphone...",
  });

  await searchBox.fill("iphone");

  await page.waitForURL("/?q=iphone");
});

test("should display twenty (tuenti) results by default", async ({ page }) => {
  const displayResults = page.getByText("20 RESULTS");

  await expect(displayResults).toBeVisible();
});

test("should display two results searching for iphone", async ({ page }) => {
  const searchBox = page.getByRole("searchbox", {
    name: "Search for a smartphone...",
  });

  await searchBox.fill("iphone");

  await page.waitForURL("/?q=iphone");

  const displayResults = page.getByText("2 RESULTS");

  await expect(displayResults).toBeVisible();
});

test("should redirect to product detail", async ({ page }) => {
  const firstProduct = page
    .getByRole("link")
    .filter({ hasText: "SamsungGalaxy S24 Ultra1329" });

  await firstProduct.click();

  await page.waitForURL("/product/SMG-S24U");
});
