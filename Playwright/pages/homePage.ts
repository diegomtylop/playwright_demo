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

    constructor(page: Page) {
        super(page);
        this.cookieOverlay = new CookieOverlay(page);
        this.searchBox = page.locator("#searchKey");
        this.resetSearch = page.locator("#btnResetKeyword");
        this.vehicleResults = page.locator(".slideWrap");
        this.vehicleNames = page.locator(".subTit4");
        this.allVehiclesTabFilter = page.locator("#allVehiclesTabArea");
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
}
