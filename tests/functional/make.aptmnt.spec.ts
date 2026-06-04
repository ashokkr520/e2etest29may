import { test, expect } from '@playwright/test';

test.describe("Make appointment", () => {

    test.beforeEach("Login with valid creds", async({page}) => {


    //1. Launch URL and assert title and header.
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //2. Click on the Make appointment.
    await page.getByRole("link", { name: "Make appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
    
    //Successful Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");

    })

    //Tests goes here
    test("Should make an appointment with non-default values", async ({ page },testInfo) => {

      console.log(`>> Current config \n: ${JSON.stringify(testInfo.config)}`);
   
        //Dropdown
   await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');

   //
   await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
   await page.getByRole('radio', { name: 'Medicaid' }).check();
   await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
   await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill('05/10/2027');
   await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press('Enter');
   await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press('Enter');
   await page.getByRole('textbox', { name: 'Comment' }).click();
   await page.getByRole('textbox', { name: 'Comment' }).fill('This is a multi-line comments\ncaptured by Playwright codegen!');
   await page.getByRole('button', { name: 'Book Appointment' }).click();

   //Assertion Confirmation.
   await expect(page.locator('h2')).toContainText('Appointment Confirmation');
   await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible();
});

   //More tests go here ...

});

