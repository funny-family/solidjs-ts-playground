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
