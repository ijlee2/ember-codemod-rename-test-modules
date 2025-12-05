import { normalize } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import { parseEntity } from '../../../../src/utils/rename-tests/index.js';

test('utils | rename-tests | parse-entity > edge case (entity type is unknown)', function () {
  const folderToEntityType = new Map([
    ['adapters', 'Adapter'],
    ['controllers', 'Controller'],
    ['initializers', 'Initializer'],
    ['instance-initializers', 'Instance Initializer'],
    ['mixins', 'Mixin'],
    ['models', 'Model'],
    ['routes', 'Route'],
    ['serializers', 'Serializer'],
    ['services', 'Service'],
    ['utils', 'Utility'],
  ]);

  const output = parseEntity(
    normalize('resources/remote-data'),
    folderToEntityType,
  );

  assert.deepStrictEqual(output, {
    entityType: undefined,
    remainingPath: normalize('resources/remote-data'),
  });
});
