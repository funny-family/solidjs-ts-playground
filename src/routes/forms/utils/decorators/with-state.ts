import {
  DEFAULT_VALUES_MAP,
  Field,
  FIELDS_MAP,
  NULLABLE_FIELDS_MAP,
  SUBMIT_QUEUE,
  SubmitFunction,
  SubmitterFunction,
  type createForm,
} from '../create-form';
import { createMutable } from 'solid-js/store';
import { batch } from 'solid-js';
import { ReactiveMap } from '../utils/reactive-map';
import { Object_fromEntries } from '../utils/main';

export var DIRTY_FIELDS_MAP = Symbol('DIRTY_FIELDS_MAP_SYMBOL') as symbol;
export var TOUCHED_FIELDS_MAP = Symbol('TOUCHED_FIELDS_MAP_SYMBOL') as symbol;

export var isTouched_defaultValue = false;
export var isDirty_defaultValue = false;
export var isSubmitted_defaultValue = false;
export var isSubmitSuccessful_defaultValue = false;
export var isSubmitting_defaultValue = false;
export var submitCount_defaultValue = 0;

export var withState = <TForm extends ReturnType<typeof createForm>>(
  form: TForm
) => {
  var fieldsMap = form[FIELDS_MAP] as ReactiveMap<string, Field>;
  var defaultValuesMap = form[DEFAULT_VALUES_MAP] as ReactiveMap<string, any>;
  var nullableFieldsMap = form[NULLABLE_FIELDS_MAP] as Map<string, Field>;

  var dirtyFieldsMap = new ReactiveMap<string, boolean>();
  var touchedFieldsMap = new ReactiveMap<string, boolean>();

  var getDirtyFields = () => {
    return Object_fromEntries(dirtyFieldsMap);
  };

  var getTouchedFields = () => {
    return Object_fromEntries(touchedFieldsMap);
  };

  var getFieldState = (fieldName: string) => {
    var fieldState = {
      isDirty: isDirty_defaultValue,
      isTouched: isTouched_defaultValue,
    };

    batch(() => {
      var dirtyField = dirtyFieldsMap.get(fieldName);
      var touchedField = touchedFieldsMap.get(fieldName);

      if (dirtyField != null) {
        fieldState.isDirty = dirtyField;
      }

      if (touchedField != null) {
        fieldState.isTouched = touchedField;
      }
    });

    return fieldState;
  };

  var state = createMutable({
    isDirty: isDirty_defaultValue,
    isTouched: isTouched_defaultValue,
    isSubmitted: isSubmitted_defaultValue,
    isSubmitSuccessful: isSubmitSuccessful_defaultValue,
    isSubmitting: isSubmitting_defaultValue,
    submitCount: submitCount_defaultValue,
    getFieldState,
    getDirtyFields,
    getTouchedFields,
  });

  var register = (fieldName: string, fieldValue: any) => {
    var getField = form.register(fieldName, fieldValue);
    var field = getField();
    // var field = fieldsMap.get(fieldName, false)!;

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

    fieldsMap.set(fieldName, updatedField);

    // var map = fieldsMap.set(fieldName, updatedField);

    // return () => {
    //   return map.get(fieldName) || nullableFieldsMap.get(fieldName);
    // };

    return getField;
  };

  // var unregister = (
  //   fieldName: string,
  //   option?: {
  //     keepDefaultValue?: boolean;
  //     keepFormDirty?: boolean;
  //     keepFormTouched?: boolean;
  //   }
  // ) => {
  //   var keepDefaultValue = option?.keepDefaultValue || false;
  //   var keepFormDirty = option?.keepFormDirty || false;
  //   var keepFormTouched = option?.keepFormTouched || false;

  //   var field = fieldsMap.get(fieldName, false);

  //   if (field == null) {
  //     return false;
  //   }

  //   var defaultValue = defaultValuesMap.get(fieldName);

  //   if (keepDefaultValue) {
  //     nullableFieldsMap.set(fieldName, {
  //       name: null,
  //       getValue: () => {
  //         return defaultValue;
  //       },
  //       setValue: null,
  //       onBlur: null,
  //       onChange: null,
  //     });
  //   } else {
  //     nullableFieldsMap.set(fieldName, {
  //       name: null,
  //       getValue: () => {
  //         return field?.getValue!();
  //       },
  //       setValue: null,
  //       onBlur: null,
  //       onChange: null,
  //     });
  //   }

  //   batch(() => {
  //     defaultValuesMap.delete(fieldName);
  //     fieldsMap.delete(fieldName);
  //     dirtyFieldsMap.delete(fieldName);
  //     touchedFieldsMap.delete(fieldName);

  //     if (keepFormDirty) {
  //       state.isDirty = true;
  //     } else {
  //       if (dirtyFieldsMap.size === 0) {
  //         state.isDirty = false;
  //       }
  //     }

  //     if (keepFormTouched) {
  //       state.isTouched = true;
  //     } else {
  //       if (touchedFieldsMap.size === 0) {
  //         state.isTouched = false;
  //       }
  //     }
  //   });

  //   nullableFieldsMap.delete(fieldName);

  //   return true;
  // };

  // type r = Parameters<>;

  // type Unregister = TForm['unregister'] extends (...args: infer U) => infer R
  //   ? (...args: U) => R
  //   : never;

  var unregister = function (
    this: {
      onCleanup?: () => void;
    },
    fieldName: Parameters<TForm['unregister']>[0],
    option: Parameters<TForm['unregister']>[1] & {
      keepFormDirty?: boolean;
      keepFormTouched?: boolean;
    }
  ) {
    var keepFormDirty = option?.keepFormDirty || false;
    var keepFormTouched = option?.keepFormTouched || false;

    var formUnregister = form.unregister.bind({
      onCleanup: () => {
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

        var cleanup = this?.onCleanup;
        if (cleanup != null) {
          cleanup();
        }
      },
    });

    return formUnregister(fieldName, option);
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

      batch(() => {
        state.isSubmitted = false;
        state.isSubmitSuccessful = false;
      });
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

  var submit: SubmitFunction = (event) => {
    var _submitter = form.submit(event);
    var queue = _submitter[SUBMIT_QUEUE];

    state.isSubmitting = true;

    var submitter = (async (onSubmit) => {
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
    }) as SubmitterFunction;

    submitter[SUBMIT_QUEUE] = queue;

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
