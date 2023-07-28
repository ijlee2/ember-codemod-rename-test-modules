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

  const output = parseEntity('resources/remote-data', folderToEntityType);

  assert.deepStrictEqual(output, {
    entityType: undefined,
    remainingPath: 'resources/remote-data',
  });
});
