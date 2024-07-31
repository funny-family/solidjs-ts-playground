import {
  DEFAULT_VALUES_MAP,
  FIELDS_MAP,
  NULLABLE_FIELDS_MAP,
  nullableField,
  type createForm,
} from '../create-form';
import { createMutable, createStore } from 'solid-js/store';
import { batch, createEffect, on } from 'solid-js';
import { ReactiveMap } from '~/utils/reactive-map';

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
  var fieldsMap = form[FIELDS_MAP];
  var defaultValuesMap = form[DEFAULT_VALUES_MAP];
  var nullableFieldsMap = form[NULLABLE_FIELDS_MAP];

  var dirtyFieldsMap = new ReactiveMap();
  var touchedFieldsMap = new ReactiveMap();

  var getDirtyFields = () => {
    return Object.fromEntries(dirtyFieldsMap);
  };

  var getTouchedFields = () => {
    return Object.fromEntries(touchedFieldsMap);
  };

  var getFieldState = (fieldName: string) => {
    return {
      isDirty: dirtyFieldsMap.get(fieldName),
      isTouched: touchedFieldsMap.get(fieldName),
    };
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

    var field = fieldsMap.get(fieldName);

    dirtyFieldsMap.set(fieldName, false);
    touchedFieldsMap.set(fieldName, false);

    var onBlur = field.onBlur;
    field.onBlur = () => {
      onBlur();

      state.isTouched = true;

      touchedFieldsMap.set(fieldName, true);
    };

    var onChange = field.onChange;
    field.onChange = (fieldValue: any) => {
      onChange(fieldValue);

      state.isDirty = true;

      dirtyFieldsMap.set(fieldName, true);
    };

    var map = fieldsMap.set(fieldName, field);

    return () => {
      return map.get(fieldName) || nullableFieldsMap.get(fieldName);
    };
  };

  var unregister = (
    fieldName: string,
    option?: { keepDefaultValue?: boolean }
  ) => {
    var keepDefaultValue = option?.keepDefaultValue || false;

    var field = fieldsMap.get(fieldName);

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
          return field.getValue();
        },
        setValue: null,
        onBlur: null,
        onChange: null,
      });
    }

    defaultValuesMap.delete(fieldName);
    fieldsMap.delete(fieldName);
    dirtyFieldsMap.delete(fieldName);
    touchedFieldsMap.delete(fieldName);
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
    var keepSubmitCount = option?.keepSubmitCount || false;
    var keepValues = option?.keepValues || false;

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
  };

  var resetField = (
    fieldName: string,
    option?: {
      keepDirty?: boolean;
      keepTouched?: boolean;
      keepValue?: boolean;
      keepSubmitCount?: boolean;
    }
  ) => {
    var keepDirty = option?.keepDirty || false;
    var keepTouched = option?.keepTouched || false;
    var keepValue = option?.keepValue || false;

    if (keepDirty === false) {
      // var dirtyFieldsValues = dirtyFieldsMap.set(fieldName, false).values().toArray();
      var dirtyFieldsValues = [
        ...dirtyFieldsMap.set(fieldName, false).values(),
      ];
      var isAllFields_NOT_Dirty = dirtyFieldsValues.every((value) => {
        return value === false;
      });

      if (isAllFields_NOT_Dirty) {
        state.isDirty = false;
      }
    }

    if (keepTouched === false) {
      // var touchedFieldsValues = touchedFieldsMap.set(fieldName, false).values().toArray();
      var touchedFieldsValues = [
        ...touchedFieldsMap.set(fieldName, false).values(),
      ];
      var isAllFields_NOT_Touched = touchedFieldsValues.every((value) => {
        return value === false;
      });

      if (isAllFields_NOT_Touched) {
        state.isTouched = false;
      }
    }

    if (keepValue) {
      return form.getValue(fieldName);
    }

    return form.resetField(fieldName);
  };

  var submit = (event: Event) => {
    var submitter = (onSubmit: (event: Event) => Promise<any>) => {
      var promise = form.submit(event)(onSubmit);

      state.isSubmitting = true;

      promise
        .then(() => {
          state.isSubmitSuccessful = true;
        })
        .catch(() => {
          state.isSubmitSuccessful = false;
        })
        .finally(() => {
          batch(() => {
            state.isSubmitted = true;
            state.isSubmitting = false;
            state.submitCount = state.submitCount + 1;
          });
        });

      return promise;
    };

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
