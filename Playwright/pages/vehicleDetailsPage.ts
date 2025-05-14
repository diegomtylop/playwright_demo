import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CookieOverlay } from './subpages/CookieOverlay';

export class VehicleDetailsPage extends BasePage {

    readonly cookieOverlay: CookieOverlay;
    readonly mainVehicleImageContainer: Locator;

    //Exterior preview
    readonly exteriorPreviewImage: Locator;
    readonly img360Preview: Locator;
    readonly img360Loaded: Locator;
    readonly wheelOptions:Locator;

    //Customize interior
    readonly interiorColors:Locator;
    readonly interiorPreviewImage:Locator;

    //Seat preview
    readonly seatsPreview:Locator;

    //Expand interior features
    readonly expandInternalFeaturesCTA:Locator;

    //Playing video
    readonly playingVideo: Locator;

    constructor(page: Page) {
        super(page);
        this.cookieOverlay = new CookieOverlay(page);
        //Alternative locators
        this.mainVehicleImageContainer = page.locator(".topVisualArea")
                            .or(page.locator(".cmpnt-keyVisual"))
                            .or( page.locator(".new-topVisualArea"));

        this.exteriorPreviewImage = page.locator("div.panorama img.panorama");
        this.img360Preview = page.locator(".pano_loading_start");
        this.img360Loaded = page.locator(".panorama.loadingEnd");
        this.wheelOptions = page.locator(".wheel .swiper-slide");
        this.interiorColors = page.locator("#chooseColors .option1 .swiper-wrapper .swiper-slide button");
        this.interiorPreviewImage = page.locator(".pnlm-preview-img");

        //Seats preview
        this.seatsPreview = page.getByAltText("interior color").filter({visible:true}).first();

        //Internal features (Xpath)
        this.expandInternalFeaturesCTA = page.locator('//button[@data-track-description="Interior Features"]')

        this.playingVideo = page.locator(".section-media__video video ").filter({visible:true}).first();
    }

    async goToDesignUrl(vehicleType: string, vehicleName: string) {
        const designUrl = `/worldwide/en/${vehicleType}/${vehicleName}/design`
        await this.page.goto(designUrl);
        await this.cookieOverlay.acceptCookies();
    }

    async selectDesignTab(tabLabel: string) {
        await this.page.getByText( tabLabel ).and(this.page.locator("//li/button")).click();
    }

    async interiorPreviewIsUpdated() {
        const optionToSelect = await this.selectRandomElement( this.interiorColors );
        const onclickValue = await optionToSelect.getAttribute("onclick");
        if( onclickValue == null ){
            throw new Error("Onclick not available");
        }
        const match = onclickValue.match(/v_color\(\s*'[^']*'\s*,\s*'([^']*)'/);
        if (match == null) {
            throw new Error("Cannot parse the color");
        }
        const selectedColor = match[1];
        console.log(`Selected color is: ${selectedColor}`);
        //TODO: TRY WITH green-three
        await optionToSelect.click();

        //Validate the color is displayed
        await this.page.locator(".colorName").and( this.page.getByText(selectedColor)).isVisible();

        const words = selectedColor.match(/\b\w+\b/g); // match words (letters, digits, underscore)
        if (words && words.length >= 2) {
        }
        if (words == null) {
            throw new Error("Cannot parse the color");
        }
        const convertedColor = `${words[0].toLowerCase()}`;

        console.log(`Converted color is: ${convertedColor}`);

        await expect.poll( async()=>{return this.interiorPreviewImage.getAttribute("style")} ).toContain(convertedColor);
    }

    async selectRandomWheel() {
        await (await this.selectRandomElement( this.wheelOptions )).click();
    }

    /**
     * Method to validate that the 360 image is updated
     */
    async validate360Update() {
        const originalSrc = await this.exteriorPreviewImage.getAttribute("src");

        await this.exteriorPreviewImage.scrollIntoViewIfNeeded();
        //Drag
        const box = await this.exteriorPreviewImage.boundingBox();
        if (box) {
            const startX = box.x + 10; // 10px from the left edge of image
            const startY = box.y + box.height / 2; // vertically centered

            const endX = box.x + box.width - 10; // 10px from the right edge

            await this.page.mouse.move(startX, startY);
            await this.page.mouse.down();
            await this.page.mouse.move(endX, startY, { steps: 20 });
            await this.page.mouse.up();
        } else {
            throw new Error('Image not found or not visible');
        }

        const updatedSrc = await this.exteriorPreviewImage.getAttribute("src");

        expect( originalSrc ).not.toEqual(updatedSrc);
    }

    async selectSeatColor(colorLabel: string) {
        //Locator by title
        await this.page.getByTitle(colorLabel).click();
    }
}
