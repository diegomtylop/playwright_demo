import { expect } from "@playwright/test";
import { Given, When, Then } from "./fixtures";
import { ScenarioData } from "state/scenarioData";

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
    homePage.selectRandomResult();
});

When(
    "the user navigates to the {string} page",
    async ({ page }, section: string) => {
        const companyLink = page.locator(
            'a[data-track-description="tab^Company"]'
        );
        await companyLink.click();
        const sectionMap: { [key: string]: string } = {
            Philosophy: 'a[href="/worldwide/en/company/philosophy"]',
            Sustainability: 'a[href="/worldwide/en/company/sustainability"]',
            Innovation: 'a[href="/worldwide/en/company/innovation"]',
            "Investor Relations":
                'a[href="/worldwide/en/company/investor-relations"]',
            Metaverse: 'a[href="/worldwide/en/company/metaverse"]',
            "Global Distributors":
                'a[href="/worldwide/en/company/global-distributors"]',
            "Contact Us": 'a[href="/worldwide/en/company/contact-us"]',
        };

        const selector = sectionMap[section];
        if (!selector) {
            throw new Error(`No selector found for section: ${section}`);
        }

        await page.click(selector);
    }
);

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
    await expect
        .poll(async () => {
            return await homePage.vehicleResults.count();
        })
        .toBeGreaterThan(0);
    //await expect( homePage.vehicleResults ).not.toBeEmpty();
});

Then(
    "the page should load correctly and display the expected content",
    async ({ page }) => {
        const content = await page.locator("div.content");
        expect(content).not.toBeNull();
    }
);
