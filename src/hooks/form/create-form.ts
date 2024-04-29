export type UseFormHook_On = (type: string, listener: () => void) => void;

export type UseFormHook_Register = (name: string, value: any) => void;

export type UseFormHook_Unregister = (name: string) => void;

export type UseFormHook_Field = Record<string, any>;

export type UseFormHook_Submit = Function;

export type UseFormHookReturn = {
  on: UseFormHook_On;
  register: UseFormHook_Register;
  unregister: UseFormHook_Unregister;
  field: Readonly<UseFormHook_Field>;
  submit: UseFormHook_Submit;
};

export interface UseFormHook extends UseFormHookReturn {
  (): UseFormHookReturn;
}

// var f = new FormData();
// f.append

export type CreateFormFunction = () => UseFormHook;

export var createForm: CreateFormFunction = () => {
  var registerListeners = new Array<Function>();
  var unregisterListeners = new Array<Function>();
  var submitListeners = new Array<Function>();
  var errorListeners = new Array<Function>();
  var anywayListeners = new Array<Function>();

  var fieldsMap = new Map<string, any>();

  var on: UseFormHook_On = (type, listener) => {
    if (type === 'register') {
      registerListeners.push(listener);
    }

    if (type === 'unregister') {
      unregisterListeners.push(listener);
    }

    if (type === 'submit') {
      submitListeners.push(listener);
    }

    if (type === 'error') {
      errorListeners.push(listener);
    }

    if (type === 'anyway') {
      anywayListeners.push(listener);
    }
  };

  var register: UseFormHookReturn['register'] = (name, value) => {
    fieldsMap.set(name, value);

    registerListeners.forEach((listener) => {
      listener();
    });
  };

  var unregister: UseFormHookReturn['unregister'] = (name) => {
    fieldsMap.delete(name);

    unregisterListeners.forEach((listener) => {
      listener();
    });
  };

  const fieldObject = {
    *[Symbol.iterator]() {
      for (const item of fieldsMap) {
        yield item[0];
      }
    },
  } as any;
  fieldObject.__proto__.valueOf = function () {
    return Object.fromEntries(fieldsMap);
  };

  var field: UseFormHookReturn['field'] = new Proxy(fieldObject, {
    get(target, prop, receive) {
      return fieldsMap.get(prop as string);
    },
  });

  var submit: UseFormHookReturn['submit'] = () => {
    //
  };

  var returnValue: UseFormHookReturn = {
    on,
    register,
    unregister,
    field,
    submit,
  };

  const hook = (() => {
    return returnValue;
  }) as UseFormHook;

  Object.assign(hook, returnValue);

  return hook;
};

// =================================================================

const useForm = createForm();
const form = useForm();
