import { expect } from "@playwright/test";
import { Given, When, Then } from "./fixtures";

Given("User is on the home page", async ({ homePage }) => {
    await homePage.navigate();
});

When("user searches for {string}", async ({ homePage }, term: string) => {
    await homePage.searchVehicle(term);
});

When("user clears search term", async ({ homePage }) => {
    await homePage.resetSearch.click();
});

When("user selects a random vehicle from the results", async ({ homePage }) => {
    await homePage.selectRandomResult();
});

Then(
    /^vehicle filter is( not)? displayed$/,
    async ({ homePage }, expectedVisibility: string) => {
        if (expectedVisibility === null) {
            //Expect to be visible
            expect(homePage.allVehiclesTabFilter).toBeVisible();
        } else {
            expect(homePage.allVehiclesTabFilter).toBeHidden();
        }
    }
);

Then("vehicle results should not be empty", async ({ homePage }) => {
    //Custom wait
    await expect
        .poll(async () => {
            return await homePage.vehicleResults.count();
        })
        .toBeGreaterThan(0);
});

When(
    "the user navigates to the {string} page",
    async ({ homePage }, section: string) => {
        console.log(`Navigating to section in HOMESTEPS: ${section}`);
        await homePage.openCompanyMenu();
        await homePage.navigateToCompanySection(section.trim());
    }
);

Then(
    "the page should load correctly and display the expected content",
    async ({ page }) => {
        const content = await page.locator("div.content");
        expect(content).not.toBeNull();
    }
);
