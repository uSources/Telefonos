import { test, expect } from "@playwright/test";

const detailURL = "http://localhost:3000/product/SMG-S24U";

test.beforeEach(async ({ page }) => {
  await page.goto(detailURL);
});

test("has back button", async ({ page }) => {
  expect(await page.getByRole("link", { name: "Back" })).toBeVisible();
});

test("back button redirects to home page", async ({ page }) => {
  await page.getByRole("link", { name: "Back" }).click();

  await page.waitForURL("http://localhost:3000/");
});

test("should have a product image", async ({ page }) => {
  expect(
    await page.getByRole("img", { name: "Galaxy S24 Ultra" })
  ).toBeVisible();
});

test("should have a product title", async ({ page }) => {
  expect(
    await page.getByRole("heading", { name: "Galaxy S24 Ultra" })
  ).toContainText("Galaxy S24 Ultra");
});

test("should have a product base price", async ({ page }) => {
  expect(await page.getByText("From 1329 EUR")).toBeVisible();
});

test("should have specifications title", async ({ page }) => {
  expect(
    await page.getByRole("heading", { name: "Specifications" })
  ).toBeVisible();
});

test("should have specs list", async ({ page }) => {
  expect(await page.getByRole("list")).toBeVisible();
});

test("should have similar products", async ({ page }) => {
  expect(
    await page.getByRole("heading", { name: "SIMILAR ITEMS" })
  ).toBeVisible();
});

test("should have similar products list", async ({ page }) => {
  const container = await page.getByTestId("similar-items");

  expect(container).toBeVisible();
});

test("should have storage title", async ({ page }) => {
  expect(
    await page.getByRole("heading", { name: "Storage ¿how much space you" })
  ).toBeVisible();
});

test("should have color title", async ({ page }) => {
  expect(
    await page.getByRole("heading", { name: "Color. pick your favorite." })
  ).toBeVisible();
});

test("add to cart button must be disabled by default", async ({ page }) => {
  expect(
    await page.getByRole("button", { name: "Add to cart" })
  ).toBeDisabled();
});

test("should update url value when storage and color are selected", async ({
  page,
}) => {
  await page.getByText("512 GB").check();

  await page
    .getByRole("radio", { name: "Titanium Yellow" })
    .check({ force: true });

  await page.waitForURL(`${detailURL}?storage=512+GB&color=%23FFFF00`);
});

test("should enable add to cart button when selecting storage and color", async ({
  page,
}) => {
  await page.getByText("512 GB").check();

  await page
    .getByRole("radio", { name: "Titanium Yellow" })
    .check({ force: true });

  await page.waitForURL(`${detailURL}?storage=512+GB&color=%23FFFF00`);

  expect(await page.getByRole("button", { name: "Add to cart" })).toBeEnabled();
});

test("should update image product when new color is picked", async ({
  page,
}) => {
  const image = await page.getByRole("img", { name: "Galaxy S24 Ultra" });

  await page
    .getByRole("radio", { name: "Titanium Yellow" })
    .check({ force: true });

  await page.waitForURL(`${detailURL}?color=%23FFFF00`);

  expect(image).toHaveAttribute("src", /titanium-yellow.png/g);
});

test("should update price when new storage is picked", async ({ page }) => {
  const price = await page.getByText("From 1329 EUR");

  await page.getByText("512 GB").check();

  expect(price).toContainText("1329 EUR");
});
