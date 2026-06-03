import { test, expect } from "@playwright/test";
import { request } from "node:http";

test("Should load homepage with correct title", async ({ page }) => {
  //Go to the Home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  //2.Assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");

  //3.Assert header text
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("Should do something", { tag: "@smoke" }, async ({ page }, testInfo) => {
  // steps..
  await page.locator("//h1").click();
});

test(
  "Should demo locators",
  { tag: "@smoke" },
  async ({ page }, testInfo) => {
    // `page.getBy*() ` and `page.locator()` methods returns the `locator` object.
    // The above method not to be `awaited`.
    // The type of locator is an `object`.
    // Locators are LAZY until an action is fired on them.
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    //2. Click on the Make appointment
    let makeAppmtBtn = page.getByRole("link", { name: "Invalid Locator" })
    // console.log(`>>> The type of locator: ${typeof makeAppmtBtn}, The value of the locator is: ${JSON.stringify(makeAppmtBtn)}`)
    await makeAppmtBtn.click();
    // await expect(page.getByText("Please login to make")).toBeVisible();
    await page.getByRole('heading', { name: 'We Care About Your Health' }).click();


  },
);

test("should demo config file", async({page},testInfo) => {
  console.log(`>> Config at run-time: ${JSON.stringify(testInfo.config)}`);
     
  
}  
);

test.only("Should demo fixtures" , async({request}, testInfo) => {
  //console.log(`>> The test runs on ${browserName}`);
});






