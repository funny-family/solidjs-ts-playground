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

// =================================================================

export var createForm = () => {
  var fieldsMap = new Map();

  var register = (fieldName: string, fieldValue: any) => {
    var { 0: value, 1: setValue } = createSignal(fieldValue);

    var field = {
      name: fieldName,
      onChange: (fieldValue: any) => {
        setValue(fieldValue);
      },
      onBlur: () => {
        //
      },
      getValue: () => {
        return value();
      },
      setValue: (fieldValue: any) => {
        setValue(fieldValue);

        return value;
      },
    };

    defaultValuesMap.set(fieldName, fieldValue);

    fieldsMap.set(fieldName, field);

    return field;
  };

  var unregister = (fieldName: string) => {
    fieldsMap.delete(fieldName);

    defaultValuesMap.delete(fieldName);
  };

  var setValue = (fieldName: string, fieldValue: any) => {
    var field = fieldsMap.get(fieldName);

    if (field == null) {
      return () => undefined;
    }

    return field.setValue(fieldValue);
  };

  var getValue = (fieldName: string) => {
    return fieldsMap.get(fieldName)?.getValue();
  };

  var getValues = () => {
    var fieldsEntries = Array(fieldsMap.size);

    var i = 0;
    fieldsMap.forEach((field, key) => {
      fieldsEntries[i] = [key, field.getValue()];

      i++;
    });

    return Object.fromEntries(fieldsEntries);
  };

  var defaultValuesMap = new Map();

  var getDefaultValues = () => {
    return Object.fromEntries(defaultValuesMap);
  };

  var reset = () => {
    fieldsMap.forEach((field, key) => {
      field.setValue(defaultValuesMap.get(key));
    });
  };

  var resetField = (fieldName: string) => {
    const defaultFieldValue = defaultValuesMap.get(fieldName);
    const field = fieldsMap.get(fieldName);

    if (defaultFieldValue == null || field == null) {
      return;
    }

    return field.setValue(defaultFieldValue);
  };

  var submit = (event: Event) => {
    var submitter = (onSubmit: (event: Event) => Promise<any>) => {
      event.preventDefault();

      onSubmit(event);
    };

    return submitter;
  };

  /*
      var submit = (event: Event, onSubmit: (event: Event) => Promise<any>) => {
        event.preventDefault();

        onSubmit(event);
      };
  */

  return {
    setValue,
    getValue,
    getValues,
    getDefaultValues,
    register,
    unregister,
    reset,
    resetField,
    submit,
  };
};

// =================================================================

export var withFormState = (form: ReturnType<typeof createForm>) => {
  var dirtyFieldsMap = new Map();
  var getDirtyFields = () => {
    return Object.fromEntries(dirtyFieldsMap);
  };

  var touchedFieldsMap = new Map();
  var getTouchedFields = () => {
    return Object.fromEntries(touchedFieldsMap);
  };

  var register = form.register;
  form.register = (fieldName: string, fieldValue: any) => {
    const field = register(fieldName, fieldValue);

    const onChange = field.onChange;
    field.onChange = (fieldValue: any) => {
      onChange(fieldValue);

      dirtyFieldsMap.set(fieldName, true);
    };

    const onBlur = field.onBlur;
    field.onBlur = () => {
      onBlur();

      touchedFieldsMap.set(fieldName, true);
    };

    return field;
  };

  var unregister = form.unregister;
  form.unregister = (fieldName: string) => {
    unregister(fieldName);

    dirtyFieldsMap.delete(fieldName);
    touchedFieldsMap.delete(fieldName);
  };

  var [state, setState] = createStore({
    isDirty: false,
    isSubmitted: false,
    isSubmitSuccessful: false,
    isSubmitting: false,
    isLoading: false,
    submitCount: 0,
    getDirtyFields,
    getTouchedFields,
  });

  return {
    ...form,
    state,
  };
};

// =================================================================
