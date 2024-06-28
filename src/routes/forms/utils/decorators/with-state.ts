import { ReactiveMap } from '@solid-primitives/map';
import { type createForm } from '../create-form';
import { createStore } from 'solid-js/store';

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

export var withState = (form: ReturnType<typeof createForm>) => {
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

  var _register = form.register;
  var register = (fieldName: string, fieldValue: any) => {
    const field = _register(fieldName, fieldValue);

    dirtyFieldsMap.set(fieldName, false);
    touchedFieldsMap.set(fieldName, false);

    var onChange = field.onChange;
    field.onChange = (fieldValue: any) => {
      onChange(fieldValue);

      if (dirtyFieldsMap.has(fieldName)) {
        setState('isDirty', true);

        dirtyFieldsMap.set(fieldName, true);
      }
    };

    var onBlur = field.onBlur;
    field.onBlur = () => {
      onBlur();

      if (touchedFieldsMap.has(fieldName)) {
        setState('isTouched', true);

        touchedFieldsMap.set(fieldName, true);
      }
    };

    return field;
  };

  var _unregister = form.unregister;
  var unregister = (fieldName: string) => {
    var isDeleted = _unregister(fieldName);

    if (isDeleted) {
      resetField(fieldName);

      dirtyFieldsMap.delete(fieldName);
      touchedFieldsMap.delete(fieldName);
    }

    return isDeleted;
  };

  var _reset = form.reset;
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
      setState('isDirty', false);
      dirtyFieldsMap.forEach((fieldValue, fieldName, map) => {
        map.set(fieldName, false);
      });
    }

    if (keepTouched === false) {
      setState('isTouched', false);

      touchedFieldsMap.forEach((fieldValue, fieldName, map) => {
        map.set(fieldName, false);
      });
    }

    if (keepSubmitCount) {
      setState('submitCount', 0);
    }

    if (keepValues === false) {
      _reset();
    }
  };

  var _resetField = form.resetField;
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
        setState('isDirty', false);
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
        setState('isTouched', false);
      }
    }

    if (keepValue) {
      return form.getValue(fieldName);
    }

    return _resetField(fieldName);
  };

  var _submit = form.submit;
  var submit = (event: Event) => {
    const submitter = _submit(event);

    setState('isSubmitting', true);
    setState('isSubmitSuccessful', false);

    submitter.on('then', () => {
      setState('isSubmitSuccessful', true);
    });

    submitter.on('catch', () => {
      setState('isSubmitSuccessful', false);
    });

    submitter.on('finally', () => {
      setState('isSubmitting', false);
      setState('isSubmitted', false);
      setState('submitCount', (state) => {
        return state + 1;
      });
    });

    return submitter;
  };

  var { 0: state, 1: setState } = createStore({
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

  // ======================= DEV =======================
  FORM_DEV.dirtyFieldsMap = dirtyFieldsMap;
  FORM_DEV.touchedFieldsMap = touchedFieldsMap;
  // ======================= DEV =======================

  return {
    ...form,
    state,
    register,
    unregister,
    reset,
    resetField,
    submit,
  };
};
