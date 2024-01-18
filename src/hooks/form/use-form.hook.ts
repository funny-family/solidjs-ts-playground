import { createEffect, type JSX } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { ReactiveMap } from '@solid-primitives/map';
// import { promisify } from 'node:util';

/**
 * Based on JSX types for Surplus and Inferno and adapted for `dom-expressions`.
 *
 * https://github.com/adamhaile/surplus/blob/master/index.d.ts
 * https://github.com/infernojs/inferno/blob/master/packages/inferno/src/core/types.ts
 */
type DOMElement = Element;

export type DeepRequired<T> = Required<{
  [K in keyof T]: T[K] extends Required<T[K]> ? T[K] : DeepRequired<T[K]>;
}>;

export type FormFieldProps = {
  name: string;
  ref: (el: HTMLElement) => void;
  onBlur: (
    event: Event & {
      currentTarget: HTMLElement;
      target: DOMElement;
    }
  ) => void;
  onChange: (
    event: Event & {
      currentTarget: HTMLElement;
      target: DOMElement;
    }
  ) => void;
};

export type FieldPropsMap = Map<string, FormFieldProps>;

export type TouchedFieldsMap = Map<string, boolean>;

export type FormStore = {
  isDirty: boolean;
  // isValid: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  isSubmitSuccessful: boolean;
  submitCount: number;
  // dirtyFields: Record<string, boolean>;
  touchedFields: TouchedFieldsMap;
  defaultValues: Record<string, any>;
  // formState: Record<string, unknown>;
  // errors: Record<string, boolean>;
  register: (name: string) => FormFieldProps;
  unregister: (name: string) => void;
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

export type UseFormHookContext = {
  fieldPropsMap: FieldPropsMap;
  touchedFieldsMap: TouchedFieldsMap;
  formStore: FormStore;
};

export type UseFormHookArgs = {
  defaultValues: Record<string, any>;
};

export type UseFormHook = (args?: UseFormHookArgs) => FormStore;

export namespace FormStoreField {
  type SubmitEventArg = Event & {
    currentTarget: HTMLFormElement;
    target: DOMElement;
  };

  export type Submit = (
    event: SubmitEventArg
  ) => (
    onSubmit: (event: SubmitEventArg) => void | Promise<void>
  ) => Promise<void>;

  export type Register = (name: string) => FormFieldProps;

  export type Unregister = (name: string) => void;
}

export var submit: FormStoreField.Submit = function (
  this: UseFormHookContext,
  event
) {
  return async (onSubmit) => {
    if (event) {
      event?.preventDefault && event.preventDefault();
      // @ts-ignore
      event?.persist && event.persist();
    }

    this.formStore.isSubmitting = true;

    try {
      await onSubmit(event);

      this.formStore.isSubmitSuccessful = true;
    } catch (error) {
      console.log('"submit" "catch" result:', error);

      this.formStore.isSubmitSuccessful = false;
    } finally {
      this.formStore.isSubmitting = false;
      this.formStore.isSubmitted = true;
      this.formStore.submitCount += 1;
    }
  };
};

export var register: FormStoreField.Register = function (
  this: UseFormHookContext,
  name
) {
  const field: FormFieldProps = {
    name,
    ref: (el) => {
      // el.name = name;

      // console.log({ el, name: el.name });
      console.log(name, { el }, this.formStore.defaultValues?.[name]);

      if (this.formStore.defaultValues?.[name] != null) {
        el.defaultValue = this.formStore.defaultValues?.[name];
      }
    },
    onBlur: () => {
      this.touchedFieldsMap.set(name, true);
    },
    onChange: () => {
      if (!this.formStore.isDirty) {
        this.formStore.isDirty = true;
      }
    },
  };

  this.fieldPropsMap.set(name, field);
  this.touchedFieldsMap.set(name, false);

  return field;
};

export var unregister: FormStoreField.Unregister = function (
  this: UseFormHookContext,
  name
) {
  this.fieldPropsMap.delete(name);
};

export var useForm = ((args: DeepRequired<UseFormHookArgs>) => {
  const fieldPropsMap: FieldPropsMap = new ReactiveMap();
  const touchedFieldsMap: TouchedFieldsMap = new ReactiveMap();

  const formStore = createMutable<FormStore>({
    isDirty: false,
    // isValid: true,
    isSubmitting: false,
    isSubmitted: false,
    isSubmitSuccessful: false,
    submitCount: 0,
    // dirtyFields: null as unknown as FormStore['dirtyFields'],
    touchedFields: touchedFieldsMap,
    defaultValues: args?.defaultValues,
    // formState: null as unknown as FormStore['formState'],
    // errors: null as unknown as FormStore['errors'],
    register: null as unknown as FormStore['register'],
    unregister: null as unknown as FormStore['unregister'],
    // setField: null as unknown as FormStore['setField'],
    // getField: null as unknown as FormStore['getField'],
    // resetField: null as unknown as FormStore['resetField'],
    // setError: null as unknown as FormStore['setError'],
    // getFieldState: null as unknown as FormStore['getFieldState'],
    // trigger: null as unknown as FormStore['trigger'],
    // reset: null as unknown as FormStore['reset'],
    submit: null as unknown as FormStore['submit'],
  });

  const context: UseFormHookContext = {
    fieldPropsMap,
    touchedFieldsMap,
    formStore,
  };

  createEffect(() => {
    console.log('"formStore" changed:', formStore);
  });

  formStore.register = register.bind(context);
  formStore.unregister = unregister.bind(context);
  formStore.submit = submit.bind(context);

  console.group('form');
  console.log('formStore:', formStore);
  console.log('context:', context);
  console.groupEnd();

  return formStore;
}) as UseFormHook;
