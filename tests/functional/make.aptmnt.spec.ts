import { test, expect } from '@playwright/test';

const log = async (level: string, msg: string) => {
    // inline logger to avoid importing a broken external file
    console.log(`[${level}] ${msg}`);
};

test.describe("Make appointment", () => {

    test.beforeEach("Login with valid creds", async({page}, testInfo) => {


    //1. Launch URL and assert title and header.

    // Get the URL from the config file 
    const envConfig = testInfo.project.use as any;


    //Custom logs
    await log("info", `Launching the web app in ${envConfig.envName}`);

    await page.goto(envConfig.appURL);
   //  await page.goto("https://katalon-demo-cura.herokuapp.com/");
   //  await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //2. Click on the Make appointment.
    await page.getByRole("link", { name: "Make appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
    
    //Successful Login
    await page.getByLabel("Username").fill(process.env.TEST_USER_NAME);
    await page.getByLabel("Password").fill(process.env.TEST_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    //Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
    await log("info", "The login is successful...")
    await log("error", "The next page did not load...")

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

