import { $PROXY } from 'solid-js';
import { createMutable } from 'solid-js/store';
import {
  DEFAULT_VALUES_MAP,
  Field,
  FIELDS_MAP,
  NULLABLE_FIELDS_MAP,
  nullableField,
  type createForm,
} from '../create-form';
import { ReactiveMap } from '../utils/reactive-map';

export var withValidation = (form: ReturnType<typeof createForm>) => {
  var fieldsMap = form[FIELDS_MAP] as ReactiveMap<string, Field>;
  var defaultValuesMap = form[DEFAULT_VALUES_MAP] as ReactiveMap<string, Field>;
  var nullableFieldsMap = form[NULLABLE_FIELDS_MAP] as ReactiveMap<
    string,
    Field
  >;

  var errorMessagesMap = new ReactiveMap<string, string>();

  var register = (fieldName: string, fieldValue: any) => {
    form.register(fieldName, fieldValue)();

    var field = fieldsMap.get(fieldName)!;

    errorMessagesMap.set(fieldName, '');

    var onBlur = field.onBlur!;
    field.onBlur = () => {
      onBlur();

      //
    };

    var onChange = field.onChange!;
    field.onChange = (fieldValue: any) => {
      onChange(fieldValue);

      //
    };

    var defaultValue = defaultValuesMap.get(fieldName);
    var map = fieldsMap.set(fieldName, field);

    return () => {
      return map.get(fieldName) || nullableFieldsMap.get(fieldName);
    };
  };

  var unregister = (fieldName: string) => {
    var isDeleted = form.unregister(fieldName);

    if (isDeleted) {
      errorMessagesMap.delete(fieldName);
    }

    return isDeleted;
  };

  var trigger = (fieldNames?: string[]) => {
    fieldNames != null
      ? fieldNames.forEach((fieldName) => {
          //
        })
      : 1;
  };

  var getFieldError = (fieldName: string) => {
    return errorMessagesMap.get(fieldName);
  };

  var getFieldsErrors = () => {
    var entries = Array(errorMessagesMap.size);

    var i = 0;
    errorMessagesMap.forEach((value, key) => {
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
