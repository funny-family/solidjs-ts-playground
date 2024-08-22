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
import { Object_fromEntries, ReversIterableArray } from './utils/main';

export var DEFAULT_VALUES_MAP = Symbol('DEFAULT_VALUES_MAP_SYMBOL') as symbol;
export var FIELDS_MAP = Symbol('FIELDS_MAP_SYMBOL') as symbol;
export var NULLABLE_FIELDS_MAP = Symbol('NULLABLE_FIELDS_MAP_SYMBOL') as symbol;
// typescript... ;((((((
export var SUBMIT_QUEUE = Symbol(
  'SUBMIT_QUEUE_SYMBOL'
) as unknown as 'SUBMIT_QUEUE';

export var nullableField_name = null as any as undefined;

export var nullableField_getValue = () => {
  return null;
};

export var nullableField_setValue = (fieldValue: any) => {
  return null;
};

export var nullableField_onBlur = () => {
  //
};

export var nullableField_onChange = () => {
  //
};

export type Field = {
  name: string;
  getValue: () => any;
  setValue: Setter<any> | ((fieldValue: any) => any);
  onBlur: () => void;
  onChange: (fieldValue: any) => void;
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

    var commutateField = (
      _fieldsMap: typeof fieldsMap,
      _nullableFieldsMap: typeof nullableFieldsMap,
      _createMemo: typeof createMemo
    ) => {
      return _createMemo(() => {
        return (map.get(fieldName) || nullableFieldsMap.get(fieldName))!;
      });
    };

    return commutateField(map, nullableFieldsMap, createMemo);
  };

  var unregister = function (
    this: {
      onCleanup?: () => void;
    },
    fieldName: string,
    option?: {
      keepDefaultValue?: boolean;
    }
  ) {
    var keepDefaultValue = option?.keepDefaultValue || false;

    var field = fieldsMap.get(fieldName, false)!;

    if (field == null) {
      return false;
    }

    var defaultValue = defaultValuesMap.get(fieldName, false); // ??? (false)

    var nullableField = {
      name: nullableField_name as any,
      getValue: () => {
        return defaultValue;
      },
      setValue: nullableField_setValue,
      onBlur: nullableField_onBlur,
      onChange: nullableField_onChange,
    };

    if (keepDefaultValue) {
      nullableFieldsMap.set(fieldName, nullableField);
    } else {
      nullableField.getValue = () => {
        return field.getValue();
      };

      nullableFieldsMap.set(fieldName, nullableField);
    }

    batch(() => {
      defaultValuesMap.delete(fieldName);
      fieldsMap.delete(fieldName);

      var cleanup = this?.onCleanup;
      if (cleanup != null) {
        cleanup();
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

    return Object_fromEntries(fieldsEntries);
  };

  var getDefaultValue = (fieldName: string) => {
    return defaultValuesMap.get(fieldName);
  };

  var getDefaultValues = () => {
    return Object_fromEntries(defaultValuesMap);
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
