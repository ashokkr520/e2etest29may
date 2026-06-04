import { test, expect } from "@playwright/test";

test.describe("Login functionality", {tag: '@demo'},() => {
  test.beforeEach("Go to login page", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //2. Click on the Make appointment
    await page.getByRole("link", { name: "Make appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
  });

  test("Should login successfully", async ({ page }) => {
    //Successful Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should prevent login with incorrect creds", async ({ page }) => {
    //1.Launch URL and assert title and header.

    //3. Unsuccessful Login
    await page.getByLabel("Username").fill("John Smith");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //4. Assert a error Message
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
