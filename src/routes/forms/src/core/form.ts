export var FIELDS_MAP = Symbol('FIELDS_MAP_SYMBOL') as symbol;
export var DEFAULT_VALUES_MAP = Symbol('DEFAULT_VALUES_MAP_SYMBOL') as symbol;
export var MAP = Symbol('MAP_SYMBOL') as symbol;

export var buildForm = () => {
  var createForm = () => {
    var fieldsMap = new Map<string, Record<string, any>>();
    var defaultValuesMap = new Map<string, any>();

    var register = (fieldName: string) => {
      var field = {
        //
      }
    };

    var unregister = (fieldName: string) => {
      //
    };

    return {
      register,
      unregister,
    };
  };

  // (createForm as any)[MAP as any as 'MAP'] = Map;

  return createForm;
};
