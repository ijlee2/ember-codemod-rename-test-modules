import { assert, test } from '@codemod-utils/tests';

import { renameModule } from '../../../../src/utils/rename-tests/index.js';

test('utils | rename-tests | rename-module > edge case (module does not exist)', function () {
  const oldFile = `test('Old name', function (assert) {});\n`;

  const newFile = renameModule(oldFile, {
    isTypeScript: true,
    moduleName: 'New name',
  });

  assert.strictEqual(newFile, `test('Old name', function (assert) {});\n`);
});
