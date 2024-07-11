import {
  DEFAULT_VALUES_MAP,
  FIELDS_MAP,
  nullableField,
  type createForm,
} from '../create-form';
import { withState } from './with-state';

export var register_ListenerName = 'register' as const;
export var unregister_ListenerName = 'unregister' as const;
export var submitStart_ListenerName = 'submit-start' as const;
export var submitSuccess_ListenerName = 'submit-success' as const;
export var submitFail_ListenerName = 'submit-fail' as const;
export var submitEnd_ListenerName = 'submit-end' as const;
export var reset_ListenerName = 'reset' as const;
export var resetField_ListenerName = 'reset-field' as const;

export var withEvents = <T extends ReturnType<typeof withState>>(form: T) => {
  // var on = (type: string, listener: Function) => {
  //   form.
  // };

  return {
    ...form,
    // on,
  };
};
