import { click, currentURL, findAll, visit } from '@ember/test-helpers';
import {
  assertProductDetails,
  assertProducts,
  setupApplicationTest,
  setupExperiments,
} from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | products/product', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    this.server.create('product', {
      categoryId: 'cake',
      description: 'Made with organic herbs',
      name: 'Vanilla Ice Cream Cake',
      price: 40,
      rating: 4.5,
      seller: "Amy's",
      shortDescription: 'Made with organic herbs',
    });

    this.server.create('product', {
      categoryId: 'mug',
      description: 'A good day starts with a good cup of coffee',
      name: 'Ember.js Mug',
      price: 8,
      rating: 5,
      seller: 'Ember',
      shortDescription: 'A good day starts with a good cup of coffee',
    });

    this.server.create('product', {
      categoryId: 'cake',
      description: 'A chocolate sponge cake with a rich cherry filling',
      name: 'Black Forest Cake',
      price: 70,
      rating: 5,
      seller: 'The local Konditorei',
      shortDescription: 'A chocolate sponge cake with a rich cherry filling',
    });
  });

  module('nest-product-details, control', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'nest-product-details': 'control',
    });

    test('We cannot visit the page', async function (assert) {
      await visit('/products/1');

      assert.strictEqual(
        currentURL(),
        '/product-details/1',
        'We are redirected.',
      );

      assertProductDetails(assert, {
        description: 'Made with organic herbs',
        name: 'Vanilla Ice Cream Cake',
        price: '$40',
        rating: '4.5 out of 5 stars',
        seller: "Amy's",
      });
    });
  });
});
