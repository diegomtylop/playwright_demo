import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CookieOverlay } from "./subpages/CookieOverlay";

export class HomePage extends BasePage {
    readonly cookieOverlay: CookieOverlay;
    readonly searchBox: Locator;
    readonly resetSearch: Locator;
    readonly vehicleResults: Locator;
    readonly vehicleNames: Locator;
    readonly allVehiclesTabFilter: Locator;
    readonly companyHeader: Locator;
    readonly companySections: { [key: string]: Locator };

    constructor(page: Page) {
        super(page);
        this.cookieOverlay = new CookieOverlay(page);
        this.searchBox = page.locator("#searchKey");
        this.resetSearch = page.locator("#btnResetKeyword");
        this.vehicleResults = page.locator(".slideWrap");
        this.vehicleNames = page.locator(".subTit4");
        this.allVehiclesTabFilter = page.locator("#allVehiclesTabArea");
        this.companyHeader = page.locator(
            'a[data-track-description="tab^Company"]'
        );
        this.companySections = {
            Philosophy: page.locator(
                'a[data-track-description="tab^Philosophy"]'
            ),
            Sustainability: page.locator(
                'a[data-track-description="tab^Sustainability"]'
            ),
            Innovation: page.locator(
                'a[data-track-description="tab^Innovation"]'
            ),
            InvestorRelations: page.locator(
                'a[data-track-description="tab^Investor Relations"]'
            ),
            Metaverse: page.locator(
                'a[data-track-description="tab^Metaverse"]'
            ),
            GlobalDistributors: page.locator(
                'a[data-track-description="tab^Global distributors"]'
            ),
            ContactUs: page.locator(
                'a[data-track-description="tab^Contact us"]'
            ),
        };
    }

    async navigate() {
        await this.page.goto("/worldwide/en/vehicles");
        await this.cookieOverlay.acceptCookies();
    }

    async searchVehicle(vehicleName: string) {
        await this.searchBox.fill(vehicleName);
        await this.page.locator("#btnSearch").click();
        await this.page.locator("#resultWrap").waitFor();
    }

    async selectRandomResult() {
        await this.vehicleResults.first();

        await expect
            .poll(async () => {
                return await this.vehicleNames.count();
            })
            .toBeLessThan(10);

        const count = await this.vehicleNames.count();
        const randomIndex = Math.floor(Math.random() * count);
        console.log(
            `Clicking random element at index: ${randomIndex} of ${count}`
        );

        const selectedVehicle = await this.vehicleNames
            .nth(randomIndex)
            .textContent();
        console.log(`Selected vehicle: ${selectedVehicle}`);

        await this.vehicleNames.nth(randomIndex).click();
    }

    async openCompanyMenu() {
        await this.companyHeader.hover();
        await this.companyHeader.click();
    }

    async navigateToCompanySection(section: string) {
        console.log(`Navigating to section: ${section}`);
        const locator = this.companySections[section];
        const isVisible = await locator.isVisible();
        if (!isVisible) {
            console.warn(
                `Locator for "${section}" not visible, retrying menu open...`
            );
            await this.openCompanyMenu();
        }

        await locator.waitFor({ state: "visible" });
        await locator.click();
    }
}
