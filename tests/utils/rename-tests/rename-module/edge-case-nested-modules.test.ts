import { assert, test } from '@codemod-utils/tests';

import { renameModule } from '../../../../src/utils/rename-tests/index.js';

test('utils | rename-tests | rename-module > edge case (nested modules)', function () {
  const oldFile = [
    `module('Old name', function (hooks) {`,
    `  module('Old name', function (nestedHooks) {});`,
    `});`,
    ``,
  ].join('\n');

  const newFile = renameModule(oldFile, {
    isTypeScript: true,
    moduleName: 'New name',
  });

  assert.strictEqual(
    newFile,
    [
      `module('New name', function (hooks) {`,
      `  module('Old name', function (nestedHooks) {});`,
      `});`,
      ``,
    ].join('\n'),
  );
});
