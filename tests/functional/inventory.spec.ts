import { test, expect } from "@playwright/test";

/**
 * 1.Login as Standard User.
 * 2.Get a list of products with its price.
 * 3.Assert that all products have non-zero value.
 */

test.describe("Inventory feature", () => {
  test.beforeEach("Login with valid creds", async ({ page }) => {

    //Launch the URL
    await page.goto("https://www.saucedemo.com/");

    //Login
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    //Assertion.
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/.*\/inventory/)

    


  });

  test("Should confirm all prices are non-zero values", async ({ page }) => {});
});


