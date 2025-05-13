import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class CookieOverlay extends BasePage {
    readonly acceptCookiesButton: Locator;

    constructor(page: Page) {
        super(page);
        this.acceptCookiesButton = page.locator("#onetrust-accept-btn-handler");
    }

    async acceptCookies(){
        await this.acceptCookiesButton.click();
    }
}