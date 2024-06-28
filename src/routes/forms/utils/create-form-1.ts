import { createStore } from 'solid-js/store';

export var createForm = () => {
  var fieldsMap = new Map();
  var [defaultValue, setDefaultValue] = createStore({});

  const hook = () => {
    

    const register = (fieldName: string, fieldDefaultValue: any) => {
      var field = {
        name: fieldName,
        onChange: (fieldValue: any) => {
          // setValue(fieldName, fieldValue);
        },
        onBlur: () => {
          //
        },
        getValue: () => {
          // return getValue(fieldName);
        },
        setValue: (fieldValue: any) => {
          // return setValue(fieldName, fieldValue);
        },
      };

      fieldsMap.set(fieldName, field);

      setDefaultValue((state) => {
        return {
          ...state,
          [fieldName]: fieldDefaultValue,
        };
      });

      return field;
    };

    const unregister = (fieldName: string) => {
      fieldsMap.delete(fieldName);

      setDefaultValue((state) => {
        var { [fieldName]: value, ...rest } = state;

        return rest;
      });
    };

    return {
      register,
      unregister,
      defaultValue,
    };
  };

  hook.fieldsMap = fieldsMap;

  return hook;
};
