import { createSignal, type JSX } from 'solid-js';
import { createMutable, createStore } from 'solid-js/store';
import { ReactiveMap } from '@solid-primitives/map';

export type UseFormHook_On = (type: string, listener: () => void) => void;

export type UseFormHook_Register = (name: string, value: any) => void;

export type UseFormHook_Unregister = (name: string) => void;

export type UseFormHook_Field = Record<string, any>;

export type UseFormHook_Submit = Function;

export type UseFormHookReturn = {
  // on: UseFormHook_On;
  fieldsMap: Map<string, any>;
  register: UseFormHook_Register;
  unregister: UseFormHook_Unregister;
  // field: Readonly<UseFormHook_Field>;
  submit: UseFormHook_Submit;
};

export interface UseFormHook extends UseFormHookReturn {
  (): UseFormHookReturn;
}

export namespace CreateFormHook {
  export type FieldsMap<
    TName extends string = string,
    TValue extends ReturnType<Register> = ReturnType<Register>
  > = Map<TName, TValue>;

  export type ValuesMap<
    TName extends string = string,
    TValue extends unknown = unknown
  > = Map<TName, TValue>;

  export type Register<TName extends string = string> = (name: TName) => {
    name: TName;
    // ref: <TElement extends HTMLElement>(element: TElement) => void;
    onChange: <T extends any>(fieldValue: T) => void;
    onBlur: () => void;
    getValue: <T extends any>() => T;
    setValue: <T extends any>(fieldName: T) => T;
  };

  export type Unregister = <TName extends string = string>(name: TName) => void;

  export type SetValue<
    TFieldName extends string = string,
    TFieldValue extends unknown = unknown
  > = (name: TFieldName, value: TFieldValue) => TFieldValue;

  export type GetValue<
    TFieldName extends string = string,
    TFieldValue extends unknown = unknown
  > = (name: TFieldName) => TFieldValue;

  export type GetValues<T extends Record<string, any> = Record<string, any>> =
    () => T;

  export type Submit = <
    TElement extends HTMLElement = HTMLElement,
    TEvent extends Event = Event,
    TEventArg = Parameters<JSX.EventHandler<TElement, TEvent>>[0]
  >(
    event: TEventArg
  ) => (
    onSubmit: (event: TEventArg) => Promise<void>
  ) => ReturnType<typeof onSubmit>;
}

export type CreateFormFunction = () => UseFormHook;

export var createForm1 = () => {
  var fieldsMap: CreateFormHook.FieldsMap = new Map();
  // var fieldValuesMap: CreateFormHook.ValuesMap = new ReactiveMap();
  var [getFieldStoreValue, setFieldStoreValue] = createStore(null as any as {});

  var setValue: CreateFormHook.SetValue = (fieldName, fieldValue) => {
    // // if (fieldValuesMap.has(fieldName)) {
    // // }

    // // return undefined;
    // fieldValuesMap.set(fieldName, fieldValue);

    // return fieldValue;

    var f = getFieldStoreValue[fieldName];

    if (f == null) {
      return undefined;
    }

    setFieldStoreValue((state) => {
      return {
        ...state,
        [fieldName]: fieldValue,
      };
    });

    return f;
  };

  var getValue: CreateFormHook.GetValue = (fieldName) => {
    // return fieldValuesMap.get(fieldName);

    return getFieldStoreValue[fieldName];
  };

  var getValues: CreateFormHook.GetValues = () => {
    // return Object.fromEntries(fieldValuesMap);

    return getFieldStoreValue;
  };

  var register: CreateFormHook.Register = (fieldName) => {
    var field: ReturnType<CreateFormHook.Register> = {
      name: fieldName,
      onChange: (fieldValue) => {
        setValue(fieldName, fieldValue);
      },
      onBlur: () => {
        //
      },
      getValue: () => {
        return getValue(fieldName);
      },
      setValue: (fieldValue) => {
        return setValue(fieldName, fieldValue);
      },
    };

    fieldsMap.set(fieldName, field);

    return field;
  };

  var unregister: CreateFormHook.Unregister = (fieldName) => {
    fieldsMap.delete(fieldName);
  };

  // var submit = <
  //   TElement extends HTMLElement = HTMLElement,
  //   TEvent extends Event = Event,
  //   TEventArg = Parameters<JSX.EventHandler<TElement, TEvent>>[0]
  // >(
  //   event: TEventArg
  // ) => {
  //   var submitCallback = (onSubmit: (event: TEventArg) => Promise<void>) => {
  //     onSubmit(event)
  //       .then(() => {
  //         submitCallback.onThen();
  //       })
  //       .catch(() => {
  //         submitCallback.onCatch();
  //       })
  //       .finally(() => {
  //         submitCallback.onFinally();
  //       });

  //     return submitCallback;
  //   };

  //   submitCallback.onThen = () => {
  //     //
  //   };

  //   submitCallback.onCatch = () => {
  //     //
  //   };

  //   submitCallback.onFinally = () => {
  //     //
  //   };

  //   return submitCallback;
  // };

  var submit = () => {
    //
  };

  return {
    register,
    unregister,
    setValue,
    getValue,
    getValues,
    submit,
  };
};

// =================================================================

export type FormState = {
  isTouched: boolean;
  isDirty: boolean;
  isSubmitted: boolean;
  isSubmitSuccessful: boolean;
  isSubmitting: boolean;
  isLoading: boolean;
  submitCount: number;
};

export var withFormState = (form: ReturnType<typeof createForm>) => {
  var state = createMutable<FormState>({
    isTouched: false,
    isDirty: false,
    isSubmitted: false,
    isSubmitSuccessful: false,
    isSubmitting: false,
    isLoading: false,
    submitCount: 0,
  });

  var register: CreateFormHook.Register = (fieldName) => {
    var registerObject = form.register(fieldName);

    var onChange = registerObject.onChange;
    registerObject.onChange = () => {
      onChange();

      state.isDirty = true;
    };

    var onBlur = registerObject.onBlur;
    registerObject.onBlur = () => {
      onBlur();

      state.isTouched = true;
    };

    return registerObject;
  };

  // var submit: CreateFormHook.Submit = (event) => {
  //   const f = form.submit(event);

  //   return f((e) => {
  //     //
  //   });
  // };

  return {
    ...form,
    // submit,
    register,
    state,
  };
};

// =================================================================

export var createForm = () => {
  var fieldsMap = new Map();

  var setValue = (fieldName: string, fieldValue: any) => {
    var signal = fieldsMap.get(fieldName);

    if (signal == null) {
      return () => undefined;
    }

    signal[1](fieldValue);

    return signal[0];
  };

  var getValue = (fieldName: string) => {
    return fieldsMap.get(fieldName)[0]();
  };

  var getValues = () => {
    var fieldsEntries = Array(fieldsMap.size);

    var i = 0;
    fieldsMap.forEach((value, key) => {
      fieldsEntries[i] = [key, value[0]];

      i++;
    });

    return Object.fromEntries(fieldsEntries);
  };

  var register = (fieldName: string) => {
    var field = {
      ...createSignal(null),
      name: fieldName,
      onChange: (fieldValue: any) => {
        setValue(fieldName, fieldValue);
      },
      onBlur: () => {
        //
      },
      getValue: () => {
        return getValue(fieldName);
      },
      setValue: (fieldValue: any) => {
        return setValue(fieldName, fieldValue);
      },
    };

    fieldsMap.set(fieldName, field);

    return field;
  };

  var unregister = (fieldName: string) => {
    fieldsMap.delete(fieldName);
  };

  var submit = () => {
    //
  };

  return {
    setValue,
    getValue,
    getValues,
    register,
    unregister,
    submit,
  };
};

// =================================================================

// export var createForm = () => {
//   var fieldsMap = new Map();
//   const [fieldValue, setFieldValue] = createStore({});

//   var setValue = (fieldName: string, fieldValue: any) => {
//     //
//   };

//   var getValue = (fieldName: string) => {
//     //
//   };

//   var getValues = () => {
//     //
//   };

//   var register = (fieldName: string) => {
//     setFieldValue()
//   };

//   var unregister = (fieldName: string) => {
//     setFieldValue()
//   };

//   var submit = () => {
//     //
//   };

//   return {
//     setValue,
//     getValue,
//     getValues,
//     register,
//     unregister,
//     submit,
//   };
// };

// =================================================================
// const form = createForm();
// const form = useForm();
