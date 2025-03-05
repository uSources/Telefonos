import { test, expect } from "@playwright/test";

const homeURL = "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(homeURL);
});

test("has searchbar", async ({ page }) => {
  expect(
    await page.getByRole("textbox", { name: "Search for a smartphone..." })
  ).toBeVisible();
});

test("searchbar cross clears value", async ({ page }) => {
  const searchInput = await page.getByRole("textbox", {
    name: "Search for a smartphone...",
  });
  await searchInput.fill("iphone");

  expect(await searchInput.inputValue()).toBe("iphone");

  await page.getByRole("button", { name: "clear" }).click();

  expect(await searchInput.inputValue()).toBe("");
});

test("searchbar cross clears the search query", async ({ page }) => {
  await page
    .getByRole("textbox", { name: "Search for a smartphone..." })
    .fill("iphone");

  await page.waitForURL("http://localhost:3000/?q=iphone");

  await page.getByRole("button", { name: "clear" }).click();

  await page.waitForURL("http://localhost:3000/?q=");
});

test("searchbar updates the url with the search query", async ({ page }) => {
  await page
    .getByRole("textbox", { name: "Search for a smartphone..." })
    .fill("iphone");

  await page.waitForURL("http://localhost:3000/?q=iphone");
});

test("should display twenty (tuenti) results by default", async ({ page }) => {
  expect(await page.getByText("RESULTS")).toContainText("20 RESULTS");
});

test("should display two results searching for iphone", async ({ page }) => {
  await page
    .getByRole("textbox", { name: "Search for a smartphone..." })
    .fill("iphone");

  await page.waitForURL("http://localhost:3000/?q=iphone");

  expect(await page.getByText("RESULTS")).toContainText("2 RESULTS");
});

test("should redirect to product detail", async ({ page }) => {
  await page
    .getByRole("link")
    .filter({ hasText: "SamsungGalaxy S24 Ultra1329" })
    .click();

  await page.waitForURL("http://localhost:3000/product/SMG-S24U");
});
