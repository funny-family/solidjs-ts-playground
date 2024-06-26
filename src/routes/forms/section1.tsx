import { createEffect } from 'solid-js';
import { createForm, withFormState } from './utils/create-form';

var field = {
  name: 'name',
  agree: 'agree',
};

export var Section1 = () => {
  var form = createForm();
  // const form = withFormState(createForm());
  var nameField = form.register(field.name);
  var agreeField = form.register(field.agree);

  window.form1 = form;

  return (
    <section>
      <h1>test1</h1>

      <div>
        <form
          style={{
            'display': 'inline-grid',
            'max-width': '600px',
            'border': '2px solid red',
            'padding': '0.8em',
          }}
          onSubmit={(event) => {
            event.preventDefault();

            console.log({ event });
          }}
        >
          <input
            type="text"
            placeholder="name"
            name={nameField.name}
            value={nameField.setValue('hfsuf7674')}
            ref={(el) => {
              // form.setValue(field.name, el.value);
            }}
            onChange={(event) => {
              nameField.onChange((event.target as HTMLInputElement).value);
            }}
            onBlur={(event) => {
              nameField.onBlur();
            }}
          />
          <div>
            <input
              id="fsjhf675"
              type="checkbox"
              name={agreeField.name}
              checked={agreeField.setValue(true)}
              ref={(el) => {
                // form.setValue(field.agree, el.checked);
              }}
              onChange={(event) => {
                agreeField.onChange((event.target as HTMLInputElement).checked);
              }}
              onBlur={(event) => {
                agreeField.onBlur();
              }}
            />
            <label for="fsjhf675">Agree</label>
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    </section>
  );
};
