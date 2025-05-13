import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CookieOverlay } from './subpages/CookieOverlay';

export class VehicleDetailsPage extends BasePage {

    readonly cookieOverlay: CookieOverlay;
    readonly mainVehicleImageContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.cookieOverlay = new CookieOverlay(page);
        //Alternative locators
        this.mainVehicleImageContainer = page.locator(".topVisualArea")
                            .or(page.locator(".cmpnt-keyVisual"))
                            .or( page.locator(".new-topVisualArea"));
    }
}
