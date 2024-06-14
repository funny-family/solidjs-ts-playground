import { createForm, withFormState } from './utils/create-form';

export const Section1 = () => {
  var form = createForm();
  // const form = withFormState(createForm());
  const nameField = form.register('name');
  const agreeField = form.register('agree');

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
          onSubmit={() => {
            //
          }}
        >
          <input
            type="text"
            placeholder="name"
            name={nameField.name}
            ref={(el) => {
              // nameField.ref(el);
            }}
            onChange={(event) => {
              nameField.onChange();
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
              ref={(el) => {
                // agreeField.ref(el);
              }}
              onChange={(event) => {
                agreeField.onChange();
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
