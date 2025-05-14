import { expect, type Locator, type Page, test} from '@playwright/test';

export class BasePage  {
    public StringValue: Map<string, string> = new Map<string, string>();
    public PricingValue: Map<string, string> = new Map<string, string>();
    readonly page: Page;
    readonly pricingLabel: Locator;
    protected static readonly LONG_WAIT = 50*1000;
    protected static readonly SHORT_WAIT = 10*1000;

    constructor(page: Page) {
        this.page = page;
        //VDP page elements xpath
        this.pricingLabel = page.locator("(//*[contains(text(),'Full pricing details')] | //*[contains(@data-testid,'fsc-pricing-stack__section__title')])[1]");
    }

    async clickOnDetailsDropdown(detailsCTA : Locator) {
        await this.pricingLabel.waitFor();
        for (const details of await detailsCTA.elementHandles()) {
            await details.click();
        }
    }

    performAction(){

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

