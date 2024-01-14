import { type JSX } from 'solid-js';
import { createMutable } from 'solid-js/store';
// import { promisify } from 'node:util';

/**
 * Based on JSX types for Surplus and Inferno and adapted for `dom-expressions`.
 *
 * https://github.com/adamhaile/surplus/blob/master/index.d.ts
 * https://github.com/infernojs/inferno/blob/master/packages/inferno/src/core/types.ts
 */
type DOMElement = Element;

type FormStore = {
  // isDirty: boolean;
  // isValid: boolean;
  isSubmitting: boolean;
  // isSubmitSuccessful: boolean;
  // submitCount: number;
  // dirtyFields: Record<string, boolean>;
  // touchedFields: Record<string, boolean>;
  // defaultValues: Record<string, boolean>;
  // formState: Record<string, unknown>;
  // errors: Record<string, boolean>;
  // register: (name: string) => void;
  // unregister: (name: string) => void;
  // setField: (name: string, value: unknown) => void;
  // getField: (name: string) => unknown;
  // resetField: (name: string, options?: Record<string, boolean | any>) => void;
  // setError: (name: string, error: Record<string, boolean>) => unknown;
  // getFieldState: (name: string) => Record<string, boolean>;
  // watch: (name: string, callback: () => void) => void;
  // trigger: () => void;
  // reset: () => void;
  submit: FormStoreField.Submit;
};

type UseFormHookContext = {
  fieldMap: Map<string, string>;
  formStore: FormStore;
};

namespace FormStoreField {
  type SubmitEventArg = Event & {
    currentTarget: HTMLElement;
    target: DOMElement;
  };

  export type Submit = (
    this: UseFormHookContext,
    event: SubmitEventArg
  ) => (onSubmit: (event: SubmitEventArg) => Promise<void>) => void;
}

var submit: FormStoreField.Submit = function (this, event) {
  return (onSubmit) => {
    if (event) {
      event.preventDefault && event.preventDefault();
      // @ts-ignore
      event.persist && event.persist();
    }

    this.formStore.isSubmitting = true;

    try {
      onSubmit(event);
    } catch (error) {
      console.log('"submit" "catch" result:', error);
    } finally {
      this.formStore.isSubmitting = false;
    }
  };
};

export var useForm = (args?: Record<string, unknown>) => {
  args ||= {};

  const fieldMap = new Map<string, string>();

  const formStore = createMutable({
    // isDirty: false,
    // isValid: true,
    isSubmitting: false,
    // isSubmitSuccessful: false,
    // submitCount: 0,
    // dirtyFields: null as unknown as FormStore['dirtyFields'],
    // touchedFields: null as unknown as FormStore['touchedFields'],
    // defaultValues: null as unknown as FormStore['defaultValues'],
    // formState: null as unknown as FormStore['formState'],
    // errors: null as unknown as FormStore['errors'],
    // register: null as unknown as FormStore['register'],
    // unregister: null as unknown as FormStore['unregister'],
    // setField: null as unknown as FormStore['setField'],
    // getField: null as unknown as FormStore['getField'],
    // resetField: null as unknown as FormStore['resetField'],
    // setError: null as unknown as FormStore['setError'],
    // getFieldState: null as unknown as FormStore['getFieldState'],
    // trigger: null as unknown as FormStore['trigger'],
    // reset: null as unknown as FormStore['reset'],
    submit: null as unknown as FormStore['submit'],
  });

  const context = {
    fieldMap,
    formStore,
  };

  formStore.submit = submit.bind(context);

  return formStore;
};
