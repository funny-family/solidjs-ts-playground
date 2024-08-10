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
    isValid: true,
    isValidating: false,
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
      }, 1500);
    });
  };

  var testS = () => {
    return new Promise((resolve, reject) => {
      var min = 500;
      var max = 800;
      var ms = Math.floor(Math.random() * (max - min + 1) + min);

      setTimeout(() => {
        resolve(undefined);
      }, ms);

      setTimeout(() => {
        reject('Saaaaaad!!!');
      }, ms);
    });
  };

  var fakeValidation = async () => {
    var returnValue = {
      data: null as any,
      error: null as any,
    };

    try {
      returnValue.data = await testS();
    } catch (error) {
      returnValue.error = error;
    }

    return returnValue;
  };

  var submit = (event: Event) => {
    var formSubmit = form.submit;
    var _submitter = formSubmit(event);
    var queue = _submitter.queue;

    validation.isValidating = true;

    // console.log({ formSubmit, _submitter });

    var submitter = async (onSubmit: (event: Event) => Promise<any>) => {
      queue.unshift(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(undefined);
            // reject();
          }, 2000);
        })
          .then(() => {
            console.log('Validating (fake) successful!');
          })
          .catch(() => {
            validation.isValid = false;
            console.log('Validating (fake) failed!');

            throw undefined;
          })
          .finally(() => {
            validation.isValidating = false;
          })
      );

      console.log(333, { _submitter, onSubmit, formSubmit });

      await _submitter(onSubmit);

      // try {
      //   await _submitter(async () => {
      //     var { data, error } = await fakeValidation();

      //     if (error != null) {
      //       validation.isValid = false;

      //       console.log('Validation failed!');

      //       throw undefined;
      //     }
      //     validation.isValid = true;
      //   });
      // } catch (error) {
      //   console.log(645, error);
      // } finally {
      //   validation.isValidating = false;
      // }

      // await _submitter(onSubmit);

      // try {
      //   await _submitter(s);

      //   validation.isValid = true;

      //   console.log(94904856, onSubmit);

      //   // await onSubmit(event);
      // } catch (error) {
      //   validation.isValid = false;

      //   console.log('catch2', error);
      // } finally {
      //   validation.isValidating = false;
      // }

      // _submitter(s)
      //   .then(() => {
      //     onSubmit(event);

      //     console.log('Validation succeeded!');
      //   })
      //   .catch(() => {
      //     console.log('Validation failed!');
      //   })
      //   .finally(() => {
      //     //
      //   });

      // nice????
      // s()
      //   .then(() => {
      //     console.log('Validation succeeded!');

      //     _submitter(onSubmit);
      //   })
      //   .catch(() => {
      //     console.log('Validation failed!');
      //   })
      //   .finally(() => {
      //     //
      //   });
    };

    submitter.queue = queue;

    // return _submitter;
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
