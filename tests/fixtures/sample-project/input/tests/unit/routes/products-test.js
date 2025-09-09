import ProductsRoute from 'my-app/routes/products';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | product details', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('route:products', ProductsRoute);

    this.route = this.owner.lookup('route:products');
  });

  test('it exists', function (assert) {
    assert.ok(this.route);
  });
});
