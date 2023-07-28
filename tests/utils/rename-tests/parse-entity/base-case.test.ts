import { assert, test } from '@codemod-utils/tests';

import { parseEntity } from '../../../../src/utils/rename-tests/index.js';

test('utils | rename-tests | parse-entity > base case', function () {
  const folderToEntityType = new Map([
    ['components', 'Component'],
    ['helpers', 'Helper'],
    ['modifiers', 'Modifier'],
  ]);

  const output = parseEntity('components/ui/form', folderToEntityType);

  assert.deepStrictEqual(output, {
    entityType: 'Component',
    remainingPath: 'ui/form',
  });
});
