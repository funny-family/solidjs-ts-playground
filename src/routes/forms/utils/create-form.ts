import {
  createEffect,
  createMemo,
  createRenderEffect,
  createSignal,
  on,
  type JSX,
} from 'solid-js';
import { createMutable, createStore } from 'solid-js/store';
import { ReactiveMap } from '~/utils/reactive-map';

export var DEFAULT_VALUES_MAP = Symbol('DEFAULT_VALUES_MAP_SYMBOL') as symbol;
export var FIELDS_MAP = Symbol('FIELDS_MAP_SYMBOL') as symbol;

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

export var nullableField = {
  name: null,
  getValue: () => {
    return null;
  },
  setValue: () => {
    return null;
  },
  onBlur: () => {
    //
  },
  onChange: () => {
    //
  },
};

export var createForm = () => {
  var fieldsMap = new ReactiveMap();
  var defaultValuesMap = new ReactiveMap();

  var register = (fieldName: string, fieldValue: any) => {
    var { 0: value, 1: setValue } = createSignal(fieldValue);

    defaultValuesMap.set(fieldName, fieldValue);

    var field = {
      name: fieldName,
      getValue: value,
      setValue: (fieldValue: any) => {
        setValue(fieldValue);

        return value;
      },
      onBlur: () => {
        //
      },
      onChange: (fieldValue: any) => {
        setValue(fieldValue);
      },
    };

    var defaultValue = defaultValuesMap.get(fieldName);
    var map = fieldsMap.set(fieldName, field);

    return () => {
      return (
        map.get(fieldName) || {
          ...nullableField,
          getValue: () => {
            return defaultValue;
          },
        }
      );
    };
  };

  var unregister = (fieldName: string) => {
    defaultValuesMap.delete(fieldName);

    return fieldsMap.delete(fieldName);
  };

  var getRegistered = (fieldName: string) => {
    return fieldsMap.get(fieldName);
  };

  var setValue = (fieldName: string, fieldValue: any) => {
    var field = fieldsMap.get(fieldName);

    if (field == null) {
      return () => undefined;
    }

    return field.setValue(fieldValue);
  };

  var getValue = (fieldName: string) => {
    return fieldsMap.get(fieldName).getValue();
  };

  var getValues = () => {
    var fieldsEntries = Array(fieldsMap.size);

    var i = 0;
    fieldsMap.forEach((field, key) => {
      fieldsEntries[i] = [key, field?.getValue()];

      i++;
    });

    return Object.fromEntries(fieldsEntries);
  };

  var getDefaultValue = (fieldName: string) => {
    return defaultValuesMap.get(fieldName);
  };

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
      return undefined;
    }

    return field.setValue(defaultFieldValue);
  };

  var submit = (event: Event) => {
    event.preventDefault();

    var submitter = (onSubmit: (event: Event) => Promise<any>) => {
      var promise = onSubmit(event);

      promise
        .then(() => {
          //
          console.log('on then');
        })
        .catch(() => {
          //
          console.log('on catch');
        })
        .finally(() => {
          //
          console.log('on finally');
        });

      return promise;
    };

    return submitter;
  };

  return {
    [FIELDS_MAP]: fieldsMap,
    [DEFAULT_VALUES_MAP]: defaultValuesMap,
    setValue,
    getValue,
    getValues,
    getDefaultValue,
    getDefaultValues,
    register,
    unregister,
    getRegistered,
    reset,
    resetField,
    submit,
  };
};

// =================================================================
