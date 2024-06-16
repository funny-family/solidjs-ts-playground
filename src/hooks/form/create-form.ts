import { submit, register } from './use-form.hook';
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
    TValue extends unknown = unknown
  > = Map<TName, TValue>;

  export type Register<
    TName extends string = string,
    TValue extends unknown = unknown
  > = (
    name: TName,
    value: TValue
  ) => {
    name: TName;
    ref: <TElement extends HTMLElement>(element: TElement) => void;
    onChange: <TEven extends Event>(event: TEven) => void;
    onBlur: <TEven extends Event>(event: TEven) => void;
  };

  export type Unregister = <TName extends string = string>(name: TName) => void;

  export type SetField<
    TName extends string = string,
    TValue extends unknown = unknown
  > = (name: TName, value: TValue) => TValue;

  export type GetField<
    TName extends string = string,
    TValue extends unknown = unknown
  > = (name: TName) => TValue;

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

  var register: CreateFormHook.Register = (name, value) => {
    fieldsMap.set(name, value);

    return {
      name,
      ref: function (element) {
        //
      },
      onChange: function (event) {
        //
      },
      onBlur: function (event) {
        //
      },
    };
  };

  var unregister: CreateFormHook.Unregister = (name) => {
    fieldsMap.delete(name);
  };

  var setField: CreateFormHook.SetField = (name, value) => {
    fieldsMap.set(name, value);

    return value;
  };

  var getField: CreateFormHook.GetField = (name) => {
    return fieldsMap.get(name);
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

  return {
    register,
    unregister,
    setField,
    getField,
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
    registerObject.onChange = function (event) {
      onChange.call(this, event);

      state.isDirty = true;
    };

    var onBlur = registerObject.onBlur;
    registerObject.onBlur = function (event) {
      onBlur.call(this, event);

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
