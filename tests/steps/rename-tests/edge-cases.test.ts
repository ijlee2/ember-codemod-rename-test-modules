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

test('steps | rename-tests > edge-cases', function () {
  const inputProject = convertFixtureToJson(
    'steps/rename-tests/edge-cases/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/rename-tests/edge-cases/output',
  );

  loadFixture(inputProject, codemodOptions);

  renameTests(options);

  assertFixture(outputProject, codemodOptions);
});
