import { setupApplicationTest } from 'ember-workshop/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | products/product', function (hooks) {
  setupApplicationTest(hooks);

  module('nest-product-details, control', function (nestedHooks) {
    test('A user cannot visit the products.product route', async function (assert) {});
  });

  module('nest-product-details, v1', function (nestedHooks) {
    test('Accessibility audit', async function (assert) {});

    test('A user can visit the products.product route', async function (assert) {});

    test('A user can check another product', async function (assert) {});

    test('When a user checks a product that does not exist, we redirect them to the products route', async function (assert) {});
  });
});
