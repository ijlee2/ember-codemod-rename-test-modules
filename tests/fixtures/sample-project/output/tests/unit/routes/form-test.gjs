import FormRoute from 'my-app/routes/form';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | form', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('route:form', FormRoute);

    this.route = this.owner.lookup('route:form');
  });

  test('it exists', function (assert) {
    assert.ok(this.route);
  });
});
