import { expect, type Locator, type Page, test} from '@playwright/test';

export class BasePage  {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getText(locator: Locator) {
        const text: string | null = await locator.textContent();
        const TextValue: string = text || '';
        return TextValue;
    }

    async selectRandomElementByString(locators: string){
        const elements = await this.page.locator(locators).all();
        expect(elements.length).toBeGreaterThan(0);
        const randomIndex = Math.floor(Math.random() * elements.length);
        return elements[randomIndex];
    }

    async selectRandomElement(locator: Locator){
        const elements = await locator.all();
        expect(elements.length).toBeGreaterThan(0);
        const randomIndex = Math.floor(Math.random() * elements.length);
        return elements[randomIndex];
    }
}

