import { test, expect } from "@playwright/test";

const detailURL = "/product/SMG-S24U";

test.beforeEach(async ({ page }) => {
  await page.goto(detailURL);
});

test("has back button", async ({ page }) => {
  const backButton = page.getByRole("link", { name: "Back" });

  await expect(backButton).toBeVisible();
});

test("back button redirects to home page", async ({ page }) => {
  const backButton = page.getByRole("link", { name: "Back" });

  await backButton.click();

  await page.waitForURL("/");
});

test("should have a product image", async ({ page }) => {
  const image = page.getByRole("img", { name: "Galaxy S24 Ultra" });

  await expect(image).toBeVisible();
});

test("should have a product title", async ({ page }) => {
  const heading = page.getByRole("heading", { name: "Galaxy S24 Ultra" });

  await expect(heading).toContainText("Galaxy S24 Ultra");
});

test("should have a product base price", async ({ page }) => {
  const price = page.getByText("From 1329 EUR");

  await expect(price).toBeVisible();
});

test("should have specifications title", async ({ page }) => {
  const heading = page.getByRole("heading", { name: "Specifications" });

  await expect(heading).toBeVisible();
});

test("should have specs list", async ({ page }) => {
  const specsList = page.getByRole("list");

  await expect(specsList).toBeVisible();
});

test("should have similar products", async ({ page }) => {
  const heading = page.getByRole("heading", { name: "SIMILAR ITEMS" });

  await expect(heading).toBeVisible();
});

test("should have similar products list", async ({ page }) => {
  const container = page.getByTestId("similar-items");

  await expect(container).toBeVisible();
});

test("should have storage title", async ({ page }) => {
  const title = page.getByRole("heading", {
    name: "Storage ¿how much space you",
  });

  await expect(title).toBeVisible();
});

test("should have color title", async ({ page }) => {
  const title = page.getByRole("heading", {
    name: "Color. pick your favorite.",
  });

  await expect(title).toBeVisible();
});

test("add to cart button must be disabled by default", async ({ page }) => {
  const button = page.getByRole("button", { name: "Add to cart" });

  await expect(button).toBeDisabled();
});

test("should update url value when storage and color are selected", async ({
  page,
}) => {
  const storageLabel = page.getByText("512 GB");
  const colorLabel = page.getByRole("radio", { name: "Titanium Yellow" });

  await storageLabel.check();

  await colorLabel.check({ force: true });

  await page.waitForURL(`${detailURL}?storage=512+GB&color=Titanium+Yellow`);
});

test("should enable add to cart button when selecting storage and color", async ({
  page,
}) => {
  const storageLabel = page.getByText("512 GB");
  const colorLabel = page.getByRole("radio", { name: "Titanium Yellow" });

  await storageLabel.check();

  await colorLabel.check({ force: true });

  await page.waitForURL(`${detailURL}?storage=512+GB&color=Titanium+Yellow`);

  const cartButton = page.getByRole("button", { name: "Add to cart" });

  await expect(cartButton).toBeEnabled();
});

test("should update image product when new color is picked", async ({
  page,
}) => {
  const image = page.getByRole("img", { name: "Galaxy S24 Ultra" });

  const colorLabel = page.getByRole("radio", { name: "Titanium Yellow" });

  await colorLabel.check({ force: true });

  await page.waitForURL(`${detailURL}?color=Titanium+Yellow`);

  await expect(image).toHaveAttribute("src", /titanium-yellow.png/g);
});

test("should update price when new storage is picked", async ({ page }) => {
  const price = page.getByText("From 1329 EUR");

  const storageLabel = page.getByText("512 GB");

  await storageLabel.check();

  await expect(price).toContainText("1329 EUR");
});
