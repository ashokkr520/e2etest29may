import { test, expect } from '@playwright/test';
import TestData from '../../data/test-data';


//Access the data
const makeApptTestData = TestData.makeAppointmentTestData(); // -> Returns 3 Objects:

//Access the data
for (const appData of makeApptTestData) {

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

    //Get Login Cookies
    const loginCookies = await page.context().cookies();
    process.env.LOGIN_COOKIES = JSON.stringify(loginCookies);



    //Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");

    })

    //Tests goes here
    test(`${appData.testId}: Should make an appointment with non-default values`, async ({ page },testInfo) => {

      // console.log(`>> Current config \n: ${JSON.stringify(testInfo.config)}`);


      // Access the login cookies:
      console.log(`>>Login cookies: ${process.env.LOGIN_COOKIES} `);
        //Dropdown
   await page.getByLabel('Facility').selectOption(appData.facility);

   //Radio button:
   await page.getByText(appData.hcp).click();

   //
   await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
   await page.getByRole('radio', { name: 'Medicaid' }).check();
   await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
   await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill(appData.visitDt);
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
}




