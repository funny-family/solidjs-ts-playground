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
// typescript... ;((((((
export var SUBMIT_QUEUE = Symbol(
  'SUBMIT_QUEUE_SYMBOL'
) as unknown as 'SUBMIT_QUEUE';

export type Field = {
  name: string | null;
  getValue: (() => any) | null;
  setValue: Setter<any> | null;
  onBlur: (() => void) | null;
  onChange: ((fieldValue: any) => void) | null;
};

export type PromiseQueue = ReversIterableArray<Promise<any>>;

export interface SubmitterFunction extends Function {
  [SUBMIT_QUEUE]: PromiseQueue;
  (onSubmit: (event: Event) => Promise<any>): Promise<any>;
}

export type SubmitFunction<TEvent extends Event = Event> = (
  event: TEvent
) => SubmitterFunction;

export var createForm = () => {
  var fieldsMap = new ReactiveMap<string, Field>();
  var nullableFieldsMap = new Map<string, Field>();
  var defaultValuesMap = new ReactiveMap<string, any>();

  var register = (fieldName: string, fieldValue: any) => {
    var { 0: value, 1: setValue } = createSignal(fieldValue);

    defaultValuesMap.set(fieldName, fieldValue);

    var field: any = {
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
      onCleanup?: () => void;
    }
  ) => {
    var keepDefaultValue = option?.keepDefaultValue || false;

    var field = fieldsMap.get(fieldName, false)!;

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
          return field.getValue!();
        },
        setValue: null,
        onBlur: null,
        onChange: null,
      });
    }

    batch(() => {
      defaultValuesMap.delete(fieldName);
      fieldsMap.delete(fieldName);

      var option_onCleanup = option?.onCleanup;
      if (option_onCleanup != null) {
        option_onCleanup();
      }
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

  var submit: SubmitFunction = (event) => {
    event.preventDefault();

    var queue = new ReversIterableArray<Promise<any>>();

    var submitter = (async (onSubmit) => {
      try {
        await Promise.all(queue);
        await onSubmit(event);
      } catch (error) {
        throw undefined;
      } finally {
        //
      }
    }) as SubmitterFunction;

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
