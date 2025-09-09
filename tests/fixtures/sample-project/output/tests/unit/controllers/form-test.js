import FormController from 'my-app/controllers/form';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('form controller', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('controller:form', FormController);

    this.controller = this.owner.lookup('controller:form');
  });

  test('it exists', function (assert) {
    assert.ok(this.controller);
  });
});
