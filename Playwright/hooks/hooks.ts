import { createBdd } from 'playwright-bdd';
import { test } from '../steps/fixtures';
import { ScenarioData } from 'state/scenarioData';

const { BeforeScenario, AfterScenario } = createBdd(test);

/**
 * The logic on this method will be called before running the steps
 * of any scenario with the corresponding tag
 */
BeforeScenario({ tags: '@precondition' }, async function () {
  console.log('Running @BEFORE hook');
});

/**
 * The logic on this method will be executed after running all the steps
 * of any scenario with the corresponding tag, even if the scenario failed
 */
AfterScenario({ tags: '@precondition' }, async function(){
  console.log("running @AFTER hook");
});
