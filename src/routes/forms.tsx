import { type JSX } from 'solid-js';
import { type EventHandlerUnionTuple } from '~/@types';
import { useForm } from '~/hooks/form/use-form.hook';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const Forms = () => {
  const form = useForm();

  const emailField = form.register('email');
  const budgetField = form.register('budget');
  const expertiseField = form.register('expertise');
  const detailsField = form.register('details');

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
            isSubmitting: form.isSubmitting,
            submitCount: form.submitCount,
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
        <input placeholder="E-mail" type="email" />
        <input placeholder="Budget" type="text" />
        <input placeholder="Required expertise" type="text" />
        <textarea
          placeholder="Other details and questions"
          cols="30"
          rows="10"
        />
        <div>
          <label for="vf465456">
            I agree to XXX’s Terms of use and user's agreements
          </label>
          <input type="checkbox" id="vf465456" />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Forms;
