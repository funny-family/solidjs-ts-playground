import {
  DEFAULT_VALUES_MAP,
  FIELDS_MAP,
  nullableField,
  type createForm,
} from '../create-form';

export var register_ListenerName = 'register' as const;
export var unregister_ListenerName = 'unregister' as const;
export var submitStart_ListenerName = 'submit-start' as const;
export var submitSuccess_ListenerName = 'submit-success' as const;
export var submitFail_ListenerName = 'submit-fail' as const;
export var submitEnd_ListenerName = 'submit-end' as const;
export var reset_ListenerName = 'reset' as const;
export var resetField_ListenerName = 'reset-field' as const;

// export type WithEvensOnArgsObj =
//   | {
//       type: typeof register_ListenerName;
//       listener: VoidFunction;
//     }
//   | {
//       type: typeof unregister_ListenerName;
//       listener: VoidFunction;
//     }
//   | {
//       type: typeof submitStart_ListenerName;
//       listener: VoidFunction;
//     }
//   | {
//       type: typeof submitSuccess_ListenerName;
//       listener: VoidFunction;
//     }
//   | {
//       type: typeof submitFail_ListenerName;
//       listener: VoidFunction;
//     }
//   | {
//       type: typeof submitEnd_ListenerName;
//       listener: VoidFunction;
//     }
//   | {
//       type: typeof reset_ListenerName;
//       listener: VoidFunction;
//     }
//   | {
//       type: typeof resetField_ListenerName;
//       listener: VoidFunction;
//     };

// type Args = { type: string; listener: Function };
// export type OnFunction = <TType extends Args>(
//   ...args: Extract<Args, { type: TType }> extends {
//     listener: infer TListener;
//   }
//     ? [TType, TListener]
//     : // :(((((((
//       [TType, any]
// ) => void;

export var withEvents = <TForm extends ReturnType<typeof createForm>>(
  form: TForm
) => {
  var registerListeners = new Array<Function>();
  var unregisterListeners = new Array<Function>();
  var submitStartListeners = new Array<Function>();
  var submitSuccessListeners = new Array<Function>();
  var submitFailListeners = new Array<Function>();
  var submitEndListeners = new Array<Function>();
  var resetListeners = new Array<Function>();
  var resetFieldListeners = new Array<Function>();

  var register = (fieldName: string, fieldValue: any) => {
    registerListeners.forEach((listener) => {
      listener();
    });

    return form.register(fieldName, fieldValue);
  };

  var unregister = (fieldName: string) => {
    unregisterListeners.forEach((listener) => {
      listener();
    });

    return form.unregister(fieldName);
  };

  var submit = (event: Event) => {
    var submitter = (onSubmit: (event: Event) => Promise<any>) => {
      var promise = form.submit(event)(onSubmit);

      submitStartListeners.forEach((listener) => {
        listener();
      });

      promise
        .then(() => {
          submitSuccessListeners.forEach((listener) => {
            listener();
          });
        })
        .catch(() => {
          submitFailListeners.forEach((listener) => {
            listener();
          });
        })
        .finally(() => {
          submitEndListeners.forEach((listener) => {
            listener();
          });
        });

      return promise;
    };

    return submitter;
  };

  var reset = () => {
    resetListeners.forEach((listener) => {
      listener();
    });

    form.reset();
  };

  var resetField = (fieldName: string) => {
    resetFieldListeners.forEach((listener) => {
      listener();
    });

    return form.resetField(fieldName);
  };

  var on = (type: string, listener: Function) => {
    if (type === register_ListenerName) {
      registerListeners.push(listener);
    }

    if (type === unregister_ListenerName) {
      unregisterListeners.push(listener);
    }

    if (type === submitStart_ListenerName) {
      submitStartListeners.push(listener);
    }

    if (type === submitSuccess_ListenerName) {
      submitSuccessListeners.push(listener);
    }

    if (type === submitFail_ListenerName) {
      submitFailListeners.push(listener);
    }

    if (type === submitEnd_ListenerName) {
      submitEndListeners.push(listener);
    }

    if (type === reset_ListenerName) {
      resetListeners.push(listener);
    }

    if (type === resetField_ListenerName) {
      resetFieldListeners.push(listener);
    }
  };

  return {
    ...form,
    register,
    unregister,
    submit,
    reset,
    resetField,
    on,
  };
};
