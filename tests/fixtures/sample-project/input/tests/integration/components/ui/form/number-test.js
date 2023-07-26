import { set } from '@ember/object';
import { fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('ui::form::number', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.changeset = {
      donation: 1000,
      email: 'zoey@emberjs.com',
      message: 'I 🧡 container queries!',
      name: 'Zoey',
      subscribe: false,
    };
  });

  test('The component renders a label and an input', async function (assert) {
    await render(hbs`
      <Ui::Form::Number
        @changeset={{this.changeset}}
        @key="donation"
        @label="Donation amount ($)"
        @minValue={{0}}
        @placeholder="100"
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Donation amount ($)', 'We see the correct label.');

    assert
      .dom('[data-test-field="Donation amount ($)"]')
      .doesNotHaveAttribute('readonly', 'The input should not be readonly.')
      .hasAttribute('type', 'number', 'We see the correct type.')
      .hasTagName('input', 'We see the correct tag name.')
      .hasValue('1000', 'We see the correct value.')
      .isEnabled('The input should be enabled.')
      .isNotRequired('The input should not be required.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');
  });

  test('We can pass @isDisabled to disable the input', async function (assert) {
    await render(hbs`
      <Ui::Form::Number
        @changeset={{this.changeset}}
        @isDisabled={{true}}
        @key="donation"
        @label="Donation amount ($)"
        @minValue={{0}}
        @placeholder="100"
      />
    `);

    assert
      .dom('[data-test-field="Donation amount ($)"]')
      .isDisabled('The input is disabled.');
  });

  test('We can pass @isReadOnly to display the value', async function (assert) {
    await render(hbs`
      <Ui::Form::Number
        @changeset={{this.changeset}}
        @isReadOnly={{true}}
        @key="donation"
        @label="Donation amount ($)"
        @minValue={{0}}
        @placeholder="100"
      />
    `);

    assert
      .dom('[data-test-field="Donation amount ($)"]')
      .hasAttribute('readonly', '', 'We see the readonly attribute.')
      .hasValue('1000', 'We see the correct value.');
  });

  test('We can pass @isRequired to require a value', async function (assert) {
    await render(hbs`
      <Ui::Form::Number
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="donation"
        @label="Donation amount ($)"
        @minValue={{0}}
        @placeholder="100"
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText(
        'Donation amount ($) *',
        'The label shows that the field is required.',
      );

    assert
      .dom('[data-test-field="Donation amount ($)"]')
      .isRequired('The input is required.');
  });

  test('We can pass @onUpdate to get the updated value', async function (assert) {
    assert.expect(6);

    let expectedValue = undefined;

    this.updateChangeset = ({ key, value }) => {
      assert.strictEqual(
        value,
        expectedValue,
        'The changeset has the correct value.',
      );

      set(this.changeset, key, value);
    };

    await render(hbs`
      <Ui::Form::Number
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="donation"
        @label="Donation amount ($)"
        @minValue={{0}}
        @onUpdate={{this.updateChangeset}}
        @placeholder="100"
      />
    `);

    // Update the value
    await fillIn('[data-test-field="Donation amount ($)"]', '');

    assert
      .dom('[data-test-field="Donation amount ($)"]')
      .hasValue('', 'We see the correct value.');

    assert
      .dom('[data-test-feedback]')
      .hasText('Please provide a value.', 'We see an error message.');

    // Update the value again
    expectedValue = 10000;

    await fillIn('[data-test-field="Donation amount ($)"]', '10000');

    assert
      .dom('[data-test-field="Donation amount ($)"]')
      .hasValue('10000', 'We see the correct value.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');
  });
});
