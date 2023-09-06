import { useForm } from '~/hooks/form/use-form.hook';

const Forms = () => {
  const letterForm = {
    controller: useForm(),
    get emailField() {
      return this.controller.register('email');
    },
  };

  return (
    <div>
      <form
        style={{
          'display': 'inline-grid',
          'max-width': '400px',
          'border': '2px solid red',
          'padding': '0.8em',
        }}
        onSubmit={() => {}}
      >
        <input placeholder="E-mail" type="email" ref={} name={} />
        <input placeholder="Budget" type="text" />
        <input placeholder="Required expertise" type="text" />
        <textarea
          placeholder="Other details and questions"
          cols="30"
          rows="10"
        />
        <div>
          <label for="vf465456">
            I agree to Exyte’s Terms of use and user's agreements
          </label>
          <input type="checkbox" id="vf465456" />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Forms;
