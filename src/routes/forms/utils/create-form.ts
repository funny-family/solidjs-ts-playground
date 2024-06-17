import { type JSX } from 'solid-js';
import { createMutable } from 'solid-js/store';

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

// var f = new FormData();
// f.append

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
    onChange: () => void;
    onBlur: () => void;
  };

  export type Unregister = <TName extends string = string>(name: TName) => void;

  export type SetFieldValue<
    TFieldName extends string = string,
    TFieldValue extends unknown = unknown
  > = (name: TFieldName, value: TFieldValue) => TFieldValue;

  export type GetFieldValue<
    TFieldName extends string = string,
    TFieldValue extends unknown = unknown
  > = (name: TFieldName) => TFieldValue;

  export type GetFieldsValues<> = () => null;

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

export var createForm = () => {
  var fieldsMap: CreateFormHook.FieldsMap = new Map();
  var fieldValuesMap: CreateFormHook.ValuesMap = new Map();

  var register: CreateFormHook.Register = (fieldName) => {
    var field: ReturnType<CreateFormHook.Register> = {
      name: fieldName,
      // ref: function (element) {
      //   //
      // },
      onChange: () => {
        //
      },
      onBlur: () => {
        //
      },
    };

    fieldsMap.set(fieldName, field);

    return field;
  };

  var unregister: CreateFormHook.Unregister = (fieldName) => {
    fieldsMap.delete(fieldName);
  };

  var setFieldValue: CreateFormHook.SetFieldValue = (fieldName, fieldValue) => {
    fieldValuesMap.set(fieldName, fieldValue);

    return fieldValue;
  };

  var getFieldValue: CreateFormHook.GetFieldValue = (fieldName) => {
    return fieldValuesMap.get(fieldName);
  };

  var getFieldsValues: CreateFormHook.GetFieldsValues = (fieldName) => {
    return fieldValuesMap.get(fieldName);
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

  var register: CreateFormHook.Register = (name, value) => {
    var registerObject = form.register(name, value);

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

// const form = createForm();
// const form = useForm();
