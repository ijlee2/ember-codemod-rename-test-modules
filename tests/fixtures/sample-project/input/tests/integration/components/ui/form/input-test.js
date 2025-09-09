import { set } from '@ember/object';
import { fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | ui/form/input', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.data = {
      email: 'zoey@emberjs.com',
      message: 'I 🧡 container queries!',
      name: 'Zoey',
      subscribe: false,
    };

    this.updateData = () => {
      // Do nothing
    };
  });

  test('it renderes', async function (assert) {
    await render(hbs`
      <Ui::Form::Input
        @data={{this.data}}
        @key="name"
        @label="Name"
        @onUpdate={{this.updateData}}
      />
    `);

    assert.dom('[data-test-label]').hasText('Name');

    assert
      .dom('[data-test-field]')
      .doesNotHaveAttribute('readonly')
      .hasAttribute('type', 'text')
      .hasTagName('input')
      .hasValue('Zoey')
      .isEnabled()
      .isNotRequired();

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('We can pass @isDisabled to disable the input', async function (assert) {
    await render(hbs`
      <Ui::Form::Input
        @data={{this.data}}
        @isDisabled={{true}}
        @key="name"
        @label="Name"
        @onUpdate={{this.updateData}}
      />
    `);

    assert.dom('[data-test-field]').isDisabled();
  });

  test('We can pass @isReadOnly to display the value', async function (assert) {
    await render(hbs`
      <Ui::Form::Input
        @data={{this.data}}
        @isReadOnly={{true}}
        @key="name"
        @label="Name"
        @onUpdate={{this.updateData}}
      />
    `);

    assert
      .dom('[data-test-field]')
      .hasAttribute('readonly', '')
      .hasValue('Zoey');
  });

  test('We can pass @isRequired to require a value', async function (assert) {
    await render(hbs`
      <Ui::Form::Input
        @data={{this.data}}
        @isRequired={{true}}
        @key="name"
        @label="Name"
        @onUpdate={{this.updateData}}
      />
    `);

    assert.dom('[data-test-label]').hasText('Name *');

    assert.dom('[data-test-field]').isRequired();
  });

  test('We can pass @onUpdate to get the updated value', async function (assert) {
    let expectedValue = '';

    this.updateData = ({ key, value }) => {
      assert.step('onUpdate');

      assert.strictEqual(value, expectedValue);

      set(data, key, value);
    };

    await render(hbs`
      <Ui::Form::Input
        @data={{this.data}}
        @isRequired={{true}}
        @key="name"
        @label="Name"
        @onUpdate={{this.updateData}}
      />
    `);

    // Update the value
    await fillIn('[data-test-field]', '');

    assert.dom('[data-test-field]').hasValue('');

    assert.dom('[data-test-error-message]').hasText('Please provide a value.');

    // Update the value again
    expectedValue = 'Tomster';

    await fillIn('[data-test-field]', 'Tomster');

    assert.dom('[data-test-field]').hasValue('Tomster');

    assert.dom('[data-test-error-message]').doesNotExist();

    assert.verifySteps(['onUpdate', 'onUpdate']);
  });

  test('We can pass @type to create an email input', async function (assert) {
    await render(hbs`
      <Ui::Form::Input
        @data={{this.data}}
        @key="email"
        @label="Email"
        @onUpdate={{this.updateData}}
        @type="email"
      />
    `);

    assert.dom('[data-test-label]').hasText('Email');

    assert
      .dom('[data-test-field]')
      .doesNotHaveAttribute('readonly')
      .hasAttribute('type', 'email')
      .hasTagName('input')
      .hasValue('zoey@emberjs.com')
      .isEnabled()
      .isNotRequired();

    assert.dom('[data-test-error-message]').doesNotExist();
  });
});
