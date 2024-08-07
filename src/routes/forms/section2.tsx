export var Section2 = () => {
  return (
    <section>
      <h1>Section2</h1>

      <form
        style={{
          'display': 'inline-grid',
          'max-width': '600px',
          'border': '2px solid red',
          'padding': '0.8em',
        }}
        onSubmit={(event) => {
          // form.submit(event)(onSubmit);
        }}
      >
        <input
          type="text"
          placeholder="name"
          autocomplete="off"
          // name={nameField()?.name}
          // value={nameField.setValue('hfsuf7674')()}
          // value={nameFieldValue()}
          // value={nameField()?.getValue()}
          ref={(el) => {
            // form.setValue(field.name, el.value);
          }}
          onChange={(event) => {
            // nameField()?.onChange((event.target as HTMLInputElement).value);
          }}
          onBlur={(event) => {
            // nameField()?.onBlur();
          }}
        />
        <div>
          <input
            id="sdukt76"
            type="checkbox"
            // name={agreeField()?.name}
            // checked={agreeField.setValue(true)()}
            // checked={agreeFieldValue()}
            // checked={agreeField()?.getValue()}
            ref={(el) => {
              // form.setValue(field.agree, el.checked);
            }}
            onChange={(event) => {
              // agreeField()?.onChange(
              //   (event.target as HTMLInputElement).checked
              // );
            }}
            onBlur={(event) => {
              // agreeField()?.onBlur();
            }}
          />
          <label for="sdukt76">Agree</label>
        </div>
        <button
          type="submit"
          // disabled={form?.state?.isSubmitting}
        >
          submit!
        </button>
        <button
          type="button"
          // disabled={form?.state?.isSubmitting}
          onClick={() => {
            // form.reset();
          }}
        >
          reset
        </button>
      </form>
    </section>
  );
};
