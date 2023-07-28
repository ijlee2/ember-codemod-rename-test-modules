import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('', function (hooks) {
  setupTest(hooks);

  module('getValue', function () {
    test('returns the value of a key', function (assert) {});

    test('returns the value of a nested key', function (assert) {});
  });

  module('isTestEnvironment', function () {
    test('returns true in the test environment', function (assert) {});
  });
});
