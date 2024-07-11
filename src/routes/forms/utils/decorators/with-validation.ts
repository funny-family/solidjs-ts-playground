import { createMutable } from 'solid-js/store';
import {
  DEFAULT_VALUES_MAP,
  FIELDS_MAP,
  nullableField,
  type createForm,
} from '../create-form';
import { ReactiveMap } from '~/utils/reactive-map';

export var withValidation = (form: ReturnType<typeof createForm>) => {
  var fieldsMap = form[FIELDS_MAP];
  var defaultValuesMap = form[DEFAULT_VALUES_MAP];

  var errorsMessagesMap = new ReactiveMap<string, string>();

  var register = (fieldName: string, fieldValue: any) => {
    const field = form.register(fieldName, fieldValue)();

    errorsMessagesMap.set(fieldName, '');

    var onBlur = field.onBlur;
    field.onBlur = () => {
      onBlur();

      //
    };

    var onChange = field.onChange;
    field.onChange = (fieldValue: any) => {
      onChange(fieldValue);

      //
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
    var isDeleted = form.unregister(fieldName);

    if (isDeleted) {
      errorsMessagesMap.delete(fieldName);
    }

    return isDeleted;
  };

  var trigger = (fieldName: string) => {
    //
  };

  var getFieldError = (fieldName: string) => {
    return errorsMessagesMap.get(fieldName);
  };

  var getFieldsErrors = () => {
    var entries = Array(errorsMessagesMap.size);

    var i = 0;
    errorsMessagesMap.forEach((value, key) => {
      entries[i++] = [key, value];
    });

    return Object.fromEntries(entries);
  };

  var validation = createMutable({
    isValid: false,
    trigger,
    getFieldError,
    getFieldsErrors,
  });

  return {
    ...form,
    validation: validation as Readonly<typeof validation>,
    register,
    unregister,
  };
};
