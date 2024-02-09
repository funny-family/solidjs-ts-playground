import { createForm } from '~/hooks/form/form';
import { useForm } from '~/hooks/form/use-form.hook';

{
  const form = createForm();

  const emailField = form.register('email');
  emailField.ref(document.createElement('input'));

  const agreeField = form.register('agree');
  agreeField.ref(document.createElement('input'));

  console.log(1231321, {
    form,
    emailField,
    agreeField,
    fieldPropsMap: form.fieldPropsMap,
  });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const Forms = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      budget: '10$',
      expertise: '',
      details: '',
      agree: true,
    },
  });
  (window as any).form = form;

  const emailField = form.register('email');
  const budgetField = form.register('budget');
  const expertiseField = form.register('expertise');
  const detailsField = form.register('details');
  const agreeField = form.register('agree');

  console.log({
    form,
    field: {
      emailField,
      budgetField,
      expertiseField,
      detailsField,
    },
  });

  const onSubmit = async (event: Event) => {
    // throw '132123';
    await sleep(3000);
    console.log('submitted!', { event });
  };

  return (
    <div>
      <pre>
        {JSON.stringify(
          {
            isDirty: form.isDirty,
            isSubmitting: form.isSubmitting,
            isSubmitted: form.isSubmitted,
            isSubmitSuccessful: form.isSubmitSuccessful,
            submitCount: form.submitCount,
            touchedFields: Object.fromEntries(form.touchedFields),
            dirtyFields: Object.fromEntries(form.dirtyFields),
            defaultValues: form.defaultValues,
          },
          null,
          2
        )}
      </pre>

      <form
        style={{
          'display': 'inline-grid',
          'max-width': '400px',
          'border': '2px solid red',
          'padding': '0.8em',
        }}
        // onSubmit={(event) => form.handleSubmit(event)(onSubmit)}
        onSubmit={(event) => form.submit(event)(onSubmit)}
        // onSubmit={[(data, event) => form.handleSubmit(event)(onSubmitBoundEventHandler), 234]}
      >
        <input
          placeholder="E-mail"
          type="email"
          name={emailField.name}
          ref={(el) => {
            emailField.ref(el);
          }}
          onBlur={(event) => {
            emailField.onBlur(event);
          }}
          onChange={(event) => {
            emailField.onChange(event);
          }}
        />
        <input
          placeholder="Budget"
          type="text"
          name={budgetField.name}
          ref={(el) => {
            budgetField.ref(el);
          }}
          onBlur={(event) => {
            budgetField.onBlur(event);
          }}
          onChange={(event) => {
            budgetField.onChange(event);
          }}
        />
        <input
          placeholder="Required expertise"
          type="text"
          name={expertiseField.name}
          ref={(el) => {
            expertiseField.ref(el);
          }}
          onBlur={(event) => {
            expertiseField.onBlur(event);
          }}
          onChange={(event) => {
            expertiseField.onChange(event);
          }}
        />
        <textarea
          placeholder="Other details and questions"
          cols="30"
          rows="10"
          name={detailsField.name}
          ref={(el) => {
            detailsField.ref(el);
          }}
          onBlur={(event) => {
            detailsField.onBlur(event);
          }}
          onChange={(event) => {
            detailsField.onChange(event);
          }}
        />
        <div>
          <label for="vf465456">
            I agree to XXX’s Terms of use and user's agreements
          </label>
          <input
            type="checkbox"
            id="vf465456"
            name={agreeField.name}
            ref={(el) => {
              agreeField.ref(el);
            }}
            onBlur={(event) => {
              agreeField.onBlur(event);
            }}
            onChange={(event) => {
              agreeField.onChange(event);
            }}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Forms;
