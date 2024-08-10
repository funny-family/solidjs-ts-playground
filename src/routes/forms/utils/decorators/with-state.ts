import {
  DEFAULT_VALUES_MAP,
  Field,
  FIELDS_MAP,
  NULLABLE_FIELDS_MAP,
  nullableField,
  type createForm,
} from '../create-form';
import { createMutable, createStore } from 'solid-js/store';
import { batch, createEffect, on } from 'solid-js';
import { ReactiveMap } from '../utils/reactive-map';
import { object_fromEntries } from '../utils/main';

export var DIRTY_FIELDS_MAP = Symbol('DIRTY_FIELDS_MAP_SYMBOL') as symbol;
export var TOUCHED_FIELDS_MAP = Symbol('TOUCHED_FIELDS_MAP_SYMBOL') as symbol;

var stateKey = {
  isTouched: 'isTouched',
  isDirty: 'isDirty',
  isSubmitted: 'isSubmitted',
  isSubmitSuccessful: 'isSubmitSuccessful',
  isSubmitting: 'isSubmitting',
  isLoading: 'isLoading',
  submitCount: 'submitCount',
  getFieldState: 'getFieldState',
  getDirtyFields: 'getDirtyFields',
  getTouchedFields: 'getTouchedFields',
} as const;

export var withState = <TForm extends ReturnType<typeof createForm>>(
  form: TForm
) => {
  var fieldsMap = form[FIELDS_MAP] as ReactiveMap<string, Field>;
  var defaultValuesMap = form[DEFAULT_VALUES_MAP] as ReactiveMap<string, any>;
  var nullableFieldsMap = form[NULLABLE_FIELDS_MAP] as Map<string, Field>;

  var dirtyFieldsMap = new ReactiveMap<string, boolean>();
  var touchedFieldsMap = new ReactiveMap<string, boolean>();

  var getDirtyFields = () => {
    return object_fromEntries(dirtyFieldsMap);
  };

  var getTouchedFields = () => {
    return object_fromEntries(touchedFieldsMap);
  };

  var getFieldState = (fieldName: string) => {
    var fieldState = {
      isDirty: false,
      isTouched: false,
    };

    batch(() => {
      fieldState.isDirty = dirtyFieldsMap.get(fieldName)!;
      fieldState.isTouched = touchedFieldsMap.get(fieldName)!;
    });

    return fieldState;
  };

  var state = createMutable({
    isTouched: false,
    isDirty: false,
    isSubmitted: false,
    isSubmitSuccessful: false,
    isSubmitting: false,
    submitCount: 0,
    getFieldState,
    getDirtyFields,
    getTouchedFields,
  });

  var register = (fieldName: string, fieldValue: any) => {
    form.register(fieldName, fieldValue);

    var field = fieldsMap.get(fieldName, false)!;

    batch(() => {
      dirtyFieldsMap.set(fieldName, false);
      touchedFieldsMap.set(fieldName, false);
    });

    var onBlur = field.onBlur!;
    var onChange = field.onChange!;

    var updatedField = {
      name: field.name,
      getValue: field.getValue,
      setValue: field.setValue,
      onBlur: () => {
        onBlur();

        state.isTouched = true;

        touchedFieldsMap.set(fieldName, true);
      },
      onChange: (fieldValue: any) => {
        onChange(fieldValue);

        state.isDirty = true;

        dirtyFieldsMap.set(fieldName, true);
      },
    };

    var map = fieldsMap.set(fieldName, updatedField);

    return () => {
      return map.get(fieldName) || nullableFieldsMap.get(fieldName);
    };
  };

  var unregister = (
    fieldName: string,
    option?: {
      keepDefaultValue?: boolean;
      keepFormDirty?: boolean;
      keepFormTouched?: boolean;
    }
  ) => {
    var keepDefaultValue = option?.keepDefaultValue || false;
    var keepFormDirty = option?.keepFormDirty || false;
    var keepFormTouched = option?.keepFormTouched || false;

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
      dirtyFieldsMap.delete(fieldName);
      touchedFieldsMap.delete(fieldName);

      if (keepFormDirty) {
        state.isDirty = true;
      } else {
        if (dirtyFieldsMap.size === 0) {
          state.isDirty = false;
        }
      }

      if (keepFormTouched) {
        state.isTouched = true;
      } else {
        if (touchedFieldsMap.size === 0) {
          state.isTouched = false;
        }
      }
    });

    nullableFieldsMap.delete(fieldName);

    return true;
  };

  var reset = (option?: {
    keepDirty?: boolean;
    keepTouched?: boolean;
    keepValues?: boolean;
    keepSubmitCount?: boolean;
  }) => {
    var keepDirty = option?.keepDirty || false;
    var keepTouched = option?.keepTouched || false;
    var keepValues = option?.keepValues || false;
    var keepSubmitCount = option?.keepSubmitCount || false;

    batch(() => {
      if (keepDirty === false) {
        state.isDirty = false;

        dirtyFieldsMap.forEach((fieldValue, fieldName, map) => {
          map.set(fieldName, false);
        });
      }

      if (keepTouched === false) {
        state.isTouched = false;

        touchedFieldsMap.forEach((fieldValue, fieldName, map) => {
          map.set(fieldName, false);
        });
      }

      if (keepSubmitCount === false) {
        state.submitCount = 0;
      }

      if (keepValues === false) {
        form.reset();
      }

      state.isSubmitted = false;
      state.isSubmitSuccessful = false;
    });
  };

  var resetField = (
    fieldName: string,
    option?: {
      keepDirty?: boolean;
      keepTouched?: boolean;
      keepValue?: boolean;
    }
  ) => {
    var keepDirty = option?.keepDirty || false;
    var keepTouched = option?.keepTouched || false;
    var keepValue = option?.keepValue || false;

    var field = fieldsMap.get(fieldName);

    if (field == null) {
      return undefined;
    }

    batch(() => {
      if (keepDirty === false) {
        var isAllFields_NOT_Dirty = true;
        var map = dirtyFieldsMap.set(fieldName, false);

        for (var entry of map) {
          if (entry[1] === true) {
            isAllFields_NOT_Dirty = false;

            break;
          }
        }

        if (isAllFields_NOT_Dirty) {
          state.isDirty = false;
        }
      }

      if (keepTouched === false) {
        var isAllFields_NOT_Touched = true;
        var map = touchedFieldsMap.set(fieldName, false);

        for (var entry of map) {
          if (entry[1] === true) {
            isAllFields_NOT_Touched = false;

            break;
          }
        }

        if (isAllFields_NOT_Touched) {
          state.isTouched = false;
        }
      }
    });

    if (keepValue) {
      return form.getValue(fieldName);
    }

    var value = form.resetField(fieldName)!;

    return value();
  };

  var submit = (event: Event) => {
    var formSubmit = form.submit;
    var _submitter = formSubmit(event);
    var queue = _submitter.queue;

    state.isSubmitting = true;

    var submitter = async (onSubmit: (event: Event) => Promise<any>) => {
      try {
        await _submitter(onSubmit);

        state.isSubmitSuccessful = true;
        console.log('then1');
      } catch {
        state.isSubmitSuccessful = false;
        console.log('catch1');
      } finally {
        batch(() => {
          state.isSubmitted = true;
          state.isSubmitting = false;
          state.submitCount++;
        });
      }
    };

    submitter.queue = queue;

    return submitter;
  };

  return {
    [DIRTY_FIELDS_MAP]: dirtyFieldsMap,
    [TOUCHED_FIELDS_MAP]: touchedFieldsMap,
    ...form,
    state: state as Readonly<typeof state>,
    register,
    unregister,
    reset,
    resetField,
    submit,
  };
};
