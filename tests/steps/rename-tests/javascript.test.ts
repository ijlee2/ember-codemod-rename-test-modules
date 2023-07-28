import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { renameTests } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/sample-project.js';

test('steps | rename-tests > javascript', function () {
  const inputProject = convertFixtureToJson(
    'steps/rename-tests/javascript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/rename-tests/javascript/output',
  );

  loadFixture(inputProject, codemodOptions);

  renameTests(options);

  assertFixture(outputProject, codemodOptions);
});
