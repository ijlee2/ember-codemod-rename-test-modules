import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | adapter | application', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:application');
    assert.ok(adapter);
  });
});
