import { createEffect } from 'solid-js';
import { createForm } from './utils/create-form';
import { withState } from './utils/decorators/with-state';

var sleep = (ms: number) => {
  return new Promise((resolve, reject) => {
    if (ms > 3000) {
      setTimeout(resolve, ms);

      return;
    }

    setTimeout(reject, ms);
  });
};

var randInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var field = {
  name: 'name',
  agree: 'agree',
};

export var Section1 = () => {
  // var useForm = createForm();
  // var form = useForm();

  // var form = createForm();
  var form = withState(createForm());
  window.form1 = form;

  var nameField = form.register(field.name, 'test');
  var agreeField = form.register(field.agree, true);

  // var nameFieldValue = nameField.setValue('hfsuf7674');
  // var agreeFieldValue = agreeField.setValue(true);

  var onSubmit = async (event: Event) => {
    // await sleep(randInt(1000, 6000));

    try {
      await sleep(randInt(1000, 6000));

      console.log({ event, field: form.getValues() });
    } catch {
      console.log('Ooops...');
    } finally {
      console.log('Finally!');
    }
  };

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
            form.submit(event)(onSubmit);
          }}
        >
          <input
            type="text"
            placeholder="name"
            autocomplete="off"
            name={nameField()?.name}
            // value={nameField.setValue('hfsuf7674')()}
            // value={nameFieldValue()}
            value={nameField()?.getValue()}
            ref={(el) => {
              // form.setValue(field.name, el.value);
            }}
            onChange={(event) => {
              nameField()?.onChange((event.target as HTMLInputElement).value);
            }}
            onBlur={(event) => {
              nameField()?.onBlur();
            }}
          />
          <div>
            <input
              id="fsjhf675"
              type="checkbox"
              name={agreeField()?.name}
              // checked={agreeField.setValue(true)()}
              // checked={agreeFieldValue()}
              checked={agreeField()?.getValue()}
              ref={(el) => {
                // form.setValue(field.agree, el.checked);
              }}
              onChange={(event) => {
                agreeField()?.onChange(
                  (event.target as HTMLInputElement).checked
                );
              }}
              onBlur={(event) => {
                agreeField()?.onBlur();
              }}
            />
            <label for="fsjhf675">Agree</label>
          </div>
          <button type="submit" disabled={form?.state?.isSubmitting}>
            submit
          </button>
        </form>

        <pre>
          <h1>Form values</h1>
          <code>
            {() => {
              return JSON.stringify(form?.getValues(), null, 2);
            }}
          </code>
        </pre>

        <hr />

        <pre>
          <h1>Form default values</h1>
          <code>
            {() => {
              return JSON.stringify(form.getDefaultValues(), null, 2);
            }}
          </code>
        </pre>

        <hr />

        <pre>
          <h1>Form state</h1>
          <code>
            {() => {
              return JSON.stringify(form?.state || {}, null, 2);
            }}
          </code>
        </pre>

        <hr />

        <pre>
          <h1>Form dirty fields</h1>
          <code>
            {() => {
              return JSON.stringify(
                form?.state.getDirtyFields() || {},
                null,
                2
              );
            }}
          </code>
        </pre>

        <hr />

        <pre>
          <h1>Form touched fields</h1>
          <code>
            {() => {
              return JSON.stringify(
                form?.state.getTouchedFields() || {},
                null,
                2
              );
            }}
          </code>
        </pre>

        <hr />

        <pre>
          <h1>"name" field state</h1>
          <code>
            {() => {
              // return JSON.stringify(
              //   form?.state?.getFieldState('name') || {},
              //   null,
              //   2
              // );
              return JSON.stringify(
                Object.keys(form?.getValues()).reduce((acc, curr) => {
                  acc[curr] = form?.state?.getFieldState(curr);

                  return acc;
                }, {}) || {},
                null,
                2
              );
            }}
          </code>
        </pre>

        <hr />
      </div>
    </section>
  );
};
