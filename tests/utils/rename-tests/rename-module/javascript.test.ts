import { assert, test } from '@codemod-utils/tests';

import { renameModule } from '../../../../src/utils/rename-tests/index.js';

test('utils | rename-tests | rename-module > javascript', function () {
  const oldFile = `module('Old name', function (hooks) {});\n`;

  const newFile = renameModule(oldFile, {
    isTypeScript: false,
    moduleName: 'New name',
  });

  assert.strictEqual(newFile, `module('New name', function (hooks) {});\n`);
});
