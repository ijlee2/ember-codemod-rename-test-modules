import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { renameModule } from '../../../../src/utils/rename-tests/index.js';

test('utils | rename-tests | rename-module > typescript', function () {
  const oldFile = normalizeFile([
    `module('Old name', function (hooks) {});`,
    ``,
  ]);

  const newFile = renameModule(oldFile, {
    isTypeScript: true,
    moduleName: 'New name',
  });

  assert.strictEqual(
    newFile,
    normalizeFile([`module('New name', function (hooks) {});`, ``]),
  );
});
