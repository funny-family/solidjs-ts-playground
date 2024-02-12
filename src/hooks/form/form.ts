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
        await onSubmit(event);
      } catch (error) {
        //
      } finally {
        //
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
