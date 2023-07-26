import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('index route', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:index');
    assert.ok(route);
  });
});
