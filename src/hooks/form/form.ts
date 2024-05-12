type F = {
  name: string;
  ref: (el: HTMLElement) => void;
  onBlur: (
    event: Event & {
      currentTarget: HTMLElement;
      target: Element;
    }
  ) => void;
  onChange: (
    event: Event & {
      currentTarget: HTMLElement;
      target: Element;
    }
  ) => void;
};

type Args = {
  defaultValue: Record<string, any>;
};

// interface Submit extends Function {
//   // (event: Event & {
//   //   currentTarget: HTMLFormElement;
//   //   target: Element;
//   // }) => any
// }

export var createForm = (args?: Args) => {
  var fieldPropsMap = new Map<string, F>();

  const register = (name: string) => {
    const field: F = {
      name,
      ref: (el) => {
        //
      },
      onBlur: (event) => {
        //
      },
      onChange: (event) => {
        //
      },
    };

    fieldPropsMap.set(name, field);

    return field;
  };

  const unregister = (name: string) => {
    fieldPropsMap.delete(name);
  };

  const submit = (
    event: Event & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => {
    return async (
      onSubmit: (
        event: Event & {
          currentTarget: HTMLFormElement;
          target: Element;
        }
      ) => void | Promise<void>
    ) => {
      try {
        // @ts-ignore
        if (submit.onTry != null) {
          // @ts-ignore
          submit.onTry();
        }

        await onSubmit(event);
      } catch (error) {
        // @ts-ignore
        if (submit.onCatch != null) {
          // @ts-ignore
          submit.onCatch();
        }
      } finally {
        // @ts-ignore
        if (submit.onFinally != null) {
          // @ts-ignore
          submit.onFinally();
        }
      }
    };
  };

  return {
    register,
    unregister,
    submit,
    fieldPropsMap,
  };
};

/* TODO: add event system

  on('submit-start', () => {
    //...
  });

  on('submit-end', () => {
    //...
  });

  on('submit-success', () => {
    //...
  });

  on('submit-unsuccess', () => {
    //...
  });
*/
