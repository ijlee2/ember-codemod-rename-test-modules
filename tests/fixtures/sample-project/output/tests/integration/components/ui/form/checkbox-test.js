import { click, render, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { UiForm } from 'my-addon/test-support';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | <Ui::Form::Checkbox>', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.parent = new UiForm();
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <Ui::Form::Checkbox
        @data={{this.parent.data}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
        @onUpdate={{this.parent.updateData}}
      />
    `);

    assert.dom('[data-test-label]').hasText('Subscribe to The Ember Times?');

    assert
      .dom('[data-test-field]')
      .hasAria('checked', 'true')
      .hasAria('disabled', 'false')
      .hasAria('readonly', 'false')
      .hasAria('required', 'false')
      .hasAttribute('role', 'checkbox')
      .hasAttribute('tabindex', '0')
      .hasTagName('span');

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('We can pass @isDisabled to disable the checkbox', async function (assert) {
    await render(hbs`
      <Ui::Form::Checkbox
        @data={{this.parent.data}}
        @isDisabled={{true}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
        @onUpdate={{this.parent.updateData}}
      />
    `);

    assert
      .dom('[data-test-field]')
      .doesNotHaveAttribute('tabindex')
      .hasAria('disabled', 'true');
  });

  test('We can pass @isReadOnly to display the value', async function (assert) {
    await render(hbs`
      <Ui::Form::Checkbox
        @data={{this.parent.data}}
        @isReadOnly={{true}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
        @onUpdate={{this.parent.updateData}}
      />
    `);

    assert
      .dom('[data-test-field]')
      .hasAria('checked', 'true')
      .hasAria('readonly', 'true')
      .hasAttribute('tabindex', '0');
  });

  test('We can pass @isRequired to require a value', async function (assert) {
    await render(hbs`
      <Ui::Form::Checkbox
        @data={{this.parent.data}}
        @isRequired={{true}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
        @onUpdate={{this.parent.updateData}}
      />
    `);

    assert.dom('[data-test-label]').hasText('Subscribe to The Ember Times? *');

    assert.dom('[data-test-field]').hasAria('required', 'true');
  });

  test('We can click on the checkbox to toggle the value', async function (assert) {
    await render(hbs`
      <Ui::Form::Checkbox
        @data={{this.parent.data}}
        @isRequired={{true}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
        @onUpdate={{this.parent.updateData}}
      />
    `);

    // Click the checkbox
    await click('[data-test-field]');

    assert.dom('[data-test-field]').hasAria('checked', 'false');

    assert
      .dom('[data-test-error-message]')
      .hasText('Please select the checkbox.');

    // Click the checkbox again
    await click('[data-test-field]');

    assert.dom('[data-test-field]').hasAria('checked', 'true');

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('We can press the Space key to toggle the value', async function (assert) {
    await render(hbs`
      <Ui::Form::Checkbox
        @data={{this.parent.data}}
        @isRequired={{true}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
        @onUpdate={{this.parent.updateData}}
      />
    `);

    // Press the Space key
    await triggerKeyEvent('[data-test-field]', 'keypress', 'Space');

    assert.dom('[data-test-field]').hasAria('checked', 'false');

    assert
      .dom('[data-test-error-message]')
      .hasText('Please select the checkbox.');

    // Press the Space key again
    await triggerKeyEvent('[data-test-field]', 'keypress', 'Space');

    assert.dom('[data-test-field]').hasAria('checked', 'true');

    assert.dom('[data-test-error-message]').doesNotExist();
  });
});
