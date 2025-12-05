import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { renameModule } from '../../../../src/utils/rename-tests/index.js';

test('utils | rename-tests | rename-module > edge case (module has incorrect arguments)', function () {
  const oldFile = `module('Old name');\n`;

  const newFile = renameModule(oldFile, {
    isTypeScript: true,
    moduleName: 'New name',
  });

  assert.strictEqual(newFile, normalizeFile([`module('Old name');`, ``]));
});
