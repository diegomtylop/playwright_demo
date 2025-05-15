import { expect } from '@playwright/test';
import{ Given,When, Then } from './fixtures';

//Customize vehicle steps
Given('I am on the customize page for a {string} {string}', async ({vehicleDetailsPage}, vehicleName:string, vehicleType:string) => {
    await vehicleDetailsPage.goToDesignUrl( vehicleType, vehicleName);
});

//Actions
When('I select {string} tab', async ({vehicleDetailsPage}, tabLabel:string) => {
    await vehicleDetailsPage.selectDesignTab(tabLabel);
});

When('I selects a random wheel option', async ({vehicleDetailsPage}) => {
    await vehicleDetailsPage.selectRandomWheel();
});

When('I select the 360 option on the preview', async ({vehicleDetailsPage}) => {
    await vehicleDetailsPage.click360Option();
});

When('I select {string} as seat color', async ({vehicleDetailsPage},colorLabel:string) => {
    await vehicleDetailsPage.selectSeatColor(colorLabel);
});

When('I click on the Interior features button', async ({vehicleDetailsPage}) => {
    //automatic scroll
    await vehicleDetailsPage.expandInternalFeaturesCTA.click();
});

//Assertions
Then('I expect to be able to see the car from different angles', async ({vehicleDetailsPage}) => {
    await vehicleDetailsPage.validate360Update();
});

Then('I expect the seats image to be updated', async ({vehicleDetailsPage}) => {
    await expect( vehicleDetailsPage.seatsPreview ).toBeVisible();
});

Then('I expect that the interior preview image changes according to the selected color', async ({vehicleDetailsPage}) => {
    await vehicleDetailsPage.interiorPreviewIsUpdated();
});

Then('user should navigate to the vehicle details page', async ({vehicleDetailsPage}) => {
    await expect( vehicleDetailsPage.mainVehicleImageContainer ).toBeVisible();
});

Then('the details page should be for a {string} vehicle', async ({vehicleDetailsPage},vehicle:string) => {
    expect(vehicleDetailsPage.page.url()).toContain(vehicle.toLowerCase());
});

Then('I expect to see the video for the interior features', async ({vehicleDetailsPage},vehicle:string) => {
    await expect(vehicleDetailsPage.playingVideo).toBeVisible();
    await expect(vehicleDetailsPage.playingVideo).toHaveClass("now-playing");
});

Then('I expect to see the Internal Features section expanded', async ({vehicleDetailsPage},vehicle:string) => {
    await expect(vehicleDetailsPage.interiorFeaturesDetails).toBeVisible();
});
