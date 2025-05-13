import { expect } from '@playwright/test';
import{ Then } from './fixtures';

Then('user should navigate to the vehicle details page', async ({vehicleDetailsPage}) => {
    await expect( vehicleDetailsPage.mainVehicleImageContainer ).toBeVisible();
});

Then('the details page should be for a {string} vehicle', async ({vehicleDetailsPage},vehicle:string) => {
    expect(vehicleDetailsPage.page.url()).toContain(vehicle.toLowerCase());
});


