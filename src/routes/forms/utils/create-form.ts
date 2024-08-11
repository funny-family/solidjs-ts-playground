import {
  batch,
  createEffect,
  createMemo,
  createRenderEffect,
  createSignal,
  on,
  Setter,
  untrack,
  type JSX,
} from 'solid-js';
import { createMutable, createStore } from 'solid-js/store';
import { ReactiveMap } from './utils/reactive-map';
import { object_fromEntries, ReversIterableArray } from './utils/main';

export var DEFAULT_VALUES_MAP = Symbol('DEFAULT_VALUES_MAP_SYMBOL') as symbol;
export var FIELDS_MAP = Symbol('FIELDS_MAP_SYMBOL') as symbol;
export var NULLABLE_FIELDS_MAP = Symbol('NULLABLE_FIELDS_MAP_SYMBOL') as symbol;
export var SUBMIT_QUEUE = Symbol('SUBMIT_QUEUE_SYMBOL') as symbol;

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

// ======================================================================

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

export type Field = {
  name: string | null;
  getValue: (() => any) | null;
  setValue: ((fieldValue: any) => () => any) | null;
  onBlur: (() => void) | null;
  onChange: ((fieldValue: any) => void) | null;
};

export var createForm = () => {
  var fieldsMap = new ReactiveMap<string, Field>();
  var nullableFieldsMap = new Map<string, Field>();
  var defaultValuesMap = new ReactiveMap<string, any>();

  var register = (fieldName: string, fieldValue: any) => {
    var { 0: value, 1: setValue } = createSignal(fieldValue);

    defaultValuesMap.set(fieldName, fieldValue);

    var field = {
      name: fieldName,
      getValue: value,
      setValue: (fieldValue: Setter<any>) => {
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

    var map = fieldsMap.set(fieldName, field);

    return () => {
      return map.get(fieldName) || nullableFieldsMap.get(fieldName);
    };
  };

  var unregister = (
    fieldName: string,
    option?: {
      keepDefaultValue?: boolean;
    }
  ) => {
    var keepDefaultValue = option?.keepDefaultValue || false;

    var field = fieldsMap.get(fieldName, false);

    if (field == null) {
      return false;
    }

    var defaultValue = defaultValuesMap.get(fieldName);

    if (keepDefaultValue) {
      nullableFieldsMap.set(fieldName, {
        name: null,
        getValue: () => {
          return defaultValue;
        },
        setValue: null,
        onBlur: null,
        onChange: null,
      });
    } else {
      nullableFieldsMap.set(fieldName, {
        name: null,
        getValue: () => {
          return field?.getValue!();
        },
        setValue: null,
        onBlur: null,
        onChange: null,
      });
    }

    batch(() => {
      defaultValuesMap.delete(fieldName);
      fieldsMap.delete(fieldName);
    });

    nullableFieldsMap.delete(fieldName);

    return true;
  };

  var setValue = (fieldName: string, fieldValue: any) => {
    var field = fieldsMap.get(fieldName);

    if (field == null) {
      return undefined;
    }

    var value = field?.setValue!(fieldValue);

    return value();
  };

  var getValue = (fieldName: string) => {
    return fieldsMap.get(fieldName)?.getValue!();
  };

  var getValues = () => {
    var fieldsEntries = Array(fieldsMap.size);

    var i = 0;
    fieldsMap.forEach((field, key) => {
      fieldsEntries[i++] = [key, field.getValue!()];
    });

    return object_fromEntries(fieldsEntries);
  };

  var getDefaultValue = (fieldName: string) => {
    return defaultValuesMap.get(fieldName);
  };

  var getDefaultValues = () => {
    return object_fromEntries(defaultValuesMap);
  };

  var reset = () => {
    fieldsMap.forEach((field, key) => {
      field.setValue!(defaultValuesMap.get(key));
    });
  };

  var resetField = (fieldName: string) => {
    const defaultFieldValue = defaultValuesMap.get(fieldName, false);
    const field = fieldsMap.get(fieldName, false);

    if (defaultFieldValue == null || field == null) {
      return () => {
        return undefined;
      };
    }

    return field.setValue!(defaultFieldValue);
  };

  var submit = (event: Event) => {
    event.preventDefault();

    var queue = new ReversIterableArray<Promise<void>>();

    var submitter = async (onSubmit: (event: Event) => Promise<any>) => {
      try {
        await Promise.all(queue);
        await onSubmit(event);
      } catch (error) {
        throw undefined;
      } finally {
        //
      }
    };

    submitter[SUBMIT_QUEUE] = queue;

    return submitter;
  };

  return {
    [FIELDS_MAP]: fieldsMap,
    [DEFAULT_VALUES_MAP]: defaultValuesMap,
    [NULLABLE_FIELDS_MAP]: nullableFieldsMap,
    setValue,
    getValue,
    getValues,
    getDefaultValue,
    getDefaultValues,
    register,
    unregister,
    reset,
    resetField,
    submit,
  };
};

// ======================================================================
