import { createBdd } from 'playwright-bdd';
import { test } from '../steps/fixtures';
import { ScenarioData } from 'state/scenarioData';

const { BeforeScenario, AfterScenario } = createBdd(test);

/**
 * Example of how to run a hooks only for scenario marked with a specific tag
 * (Currently is not being called by any scenario)
 */
BeforeScenario({ tags: '@CancelOrder' }, async function () {
  console.log('@BEFORE" with tags');
});

/**
 * Hook to be called after the scenarios that place orders are executed
 * (Currently it is not being called by any scenario)
 */
AfterScenario({ tags: '@CancelOrder' }, async function({scenarioData}){
  console.log("AFTER after hook to cancel order"+scenarioData.getData(ScenarioData.KEYS.ORDER_ID));
  //In here we should call the API and cancel the order that was placed inside the scenario
});
