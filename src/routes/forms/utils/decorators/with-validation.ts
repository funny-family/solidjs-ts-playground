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
import { object_fromEntries } from '../utils/main';
import { withState } from './with-state';
import { Writeable } from '../../types';

// https://kellenmace.com/blog/list-paths-to-all-deeply-nested-javascript-object-keys

var v = () => {
  return new Promise((resolve, reject) => {
    const min = 500;
    const max = 2000;
    // var ms = Math.floor(Math.random() * (max - min + 1) + min);
    var ms = 1100;

    if (ms > 1000) {
      setTimeout(resolve, ms);

      return;
    }

    setTimeout(reject, ms);
  });
};

export var withValidation = (form: ReturnType<typeof withState>) => {
  var fieldsMap = form[FIELDS_MAP] as ReactiveMap<string, Field>;
  var defaultValuesMap = form[DEFAULT_VALUES_MAP] as ReactiveMap<string, Field>;
  var nullableFieldsMap = form[NULLABLE_FIELDS_MAP] as ReactiveMap<
    string,
    Field
  >;
  var state = form.state as Writeable<typeof form.state>;

  var errorMessagesMap = new ReactiveMap<string, string>();

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

    return object_fromEntries(entries);
  };

  var validation = createMutable({
    isValid: false,
    trigger,
    getFieldError,
    getFieldsErrors,
  });

  var register = (fieldName: string, fieldValue: any) => {
    form.register(fieldName, fieldValue)();

    var field = fieldsMap.get(fieldName)!;

    errorMessagesMap.set(fieldName, '');

    var onBlur = field.onBlur!;
    var onChange = field.onChange!;

    var updatedField = {
      name: field.name,
      getValue: field.getValue,
      setValue: field.setValue,
      onBlur: () => {
        onBlur();
      },
      onChange: (fieldValue: any) => {
        onChange(fieldValue);
      },
    };

    var map = fieldsMap.set(fieldName, updatedField);

    return () => {
      return map.get(fieldName) || nullableFieldsMap.get(fieldName);
    };
  };

  // var unregister = (fieldName: string) => {
  //   var isDeleted = form.unregister(fieldName);

  //   if (isDeleted) {
  //     errorMessagesMap.delete(fieldName);
  //   }

  //   return isDeleted;
  // };

  // var p = v()
  // .then(() => {
  //   console.log('Validation succeeded!');
  // })
  // .catch(() => {
  //   console.log('Validation failed!');
  // });

  var s = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject();
      }, 1000);
    });
  };

  var submit = (event: Event) => {
    var _submitter = form.submit(event);

    var submitter = async (onSubmit: (event: Event) => Promise<any>) => {
      try {
        var isValidationSuccessful = false;

        // await Promise.reject();
        // await onSubmit(() => {
        //   new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       reject();
        //     }, 1000);
        //   });
        // });

        await _submitter(s);

        await onSubmit(event);

        console.log('Validation succeeded!');
      } catch {
        console.log('Validation failed!');
      } finally {
        //
      }

      // try {
      //   setTimeout(() => {
      //     Promise.reject();
      //   }, 1000);
      // } catch (error) {
      //   console.log('Validation failed!');
      // }
    };

    return submitter;
  };

  return {
    ...form,
    validation: validation as Readonly<typeof validation>,
    register,
    // unregister,
    submit,
  };
};
