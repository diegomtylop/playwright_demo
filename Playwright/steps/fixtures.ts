import { test as base, createBdd } from 'playwright-bdd';
import { HomePage } from '@pages/homePage';
import{ ScenarioData } from '../state/scenarioData'
import { VehicleDetailsPage } from '@pages/vehicleDetailsPage';

export type TestData = {
  homePage: HomePage,
  vehicleDetailsPage:VehicleDetailsPage,
  scenarioData:ScenarioData
}

export const test = base.extend<TestData>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  vehicleDetailsPage: async ({ page }, use) => {
    await use(new VehicleDetailsPage(page));
  },
  scenarioData: async({},use)=>{
    await use( new ScenarioData() );
  },
});
export const { Given, When, Then } = createBdd(test);
