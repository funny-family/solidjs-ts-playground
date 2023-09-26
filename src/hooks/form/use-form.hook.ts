import { type JSX } from 'solid-js';
import { createMutable } from 'solid-js/store';
// import { promisify } from 'node:util';

type Callback<A> = (args: A) => void;
const promisify =
  <T, A>(fn: (args: T, cb: Callback<A>) => void): ((args: T) => Promise<A>) =>
  (args: T) =>
    new Promise((resolve) => {
      fn(args, (callbackArgs) => {
        resolve(callbackArgs);
      });
    });

/**
 * Based on JSX types for Surplus and Inferno and adapted for `dom-expressions`.
 *
 * https://github.com/adamhaile/surplus/blob/master/index.d.ts
 * https://github.com/infernojs/inferno/blob/master/packages/inferno/src/core/types.ts
 */
type DOMElement = Element;

interface EventHandler<
  TCurrentTarget extends HTMLElement,
  TEvent extends Event
> {
  (
    event: TEvent & {
      currentTarget: TCurrentTarget;
      target: DOMElement;
    } & {
      submitter: HTMLElement;
    }
  ): void;
}

interface DataBoundEventHandler<
  TCurrentTarget extends HTMLElement,
  TEvent extends Event,
  TData extends any
> {
  (
    data: TData,
    event: TEvent & {
      currentTarget: TCurrentTarget;
      target: DOMElement;
    } & {
      submitter: HTMLElement;
    }
  ): void;
}

type HSE = EventHandler<HTMLFormElement, Event>;
type HandleSubmitEvent = (event: Parameters<HSE>[0]) => (onSubmit: HSE) => void;

// type HBEH = DataBoundEventHandler
// type HandleBoundEventHandler=(data, event) => (onSubmit: HandleSubmitEvent) => void;

type FormStore = {
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
  submitCount: number;
  dirtyFields: Record<string, boolean>;
  touchedFields: Record<string, boolean>;
  defaultValues: Record<string, boolean>;
  formState: Record<string, unknown>;
  errors: Record<string, boolean>;
  register: (name: string) => void;
  unregister: (name: string) => void;
  setField: (name: string, value: unknown) => void;
  getField: (name: string) => unknown;
  resetField: (name: string, options?: Record<string, boolean | any>) => void;
  setError: (name: string, error: Record<string, boolean>) => unknown;
  getFieldState: (name: string) => Record<string, boolean>;
  watch: (name: string, callback: () => void) => void;
  trigger: () => void;
  reset: () => void;
  handleSubmitEvent: HandleSubmitEvent;
};

function handleSubmitEvent(this: Record<string, any>, event: Event) {
  return (onSubmit: Function) => {
    if (event) {
      event.preventDefault && event.preventDefault();
      // @ts-ignore
      event.persist && event.persist();
    }

    this.formStore.isSubmitting = true;

    console.log(onSubmit.constructor.name);

    // const onSubmit_async = promisify(onSubmit);
    // onSubmit_async(event)
    //   .then((value) => {
    //     console.log({ value });
    //   })
    //   .catch((error) => {
    //     console.log({ error });
    //   })
    //   .finally(() => {
    //     formStore.isSubmitting = false;
    //   });

    try {
      onSubmit(event);
    } catch (error) {
      //
    } finally {
      this.formStore.isSubmitting = false;
    }
  };
}

export const useForm = (args?: Record<string, unknown>) => {
  args ||= {};

  const fieldMap = new Map();

  const formStore = createMutable({
    isDirty: false,
    isValid: true,
    isSubmitting: false,
    isSubmitSuccessful: false,
    submitCount: 0,
    dirtyFields: null as unknown as FormStore['dirtyFields'],
    touchedFields: null as unknown as FormStore['touchedFields'],
    defaultValues: null as unknown as FormStore['defaultValues'],
    formState: null as unknown as FormStore['formState'],
    errors: null as unknown as FormStore['errors'],
    register: null as unknown as FormStore['register'],
    unregister: null as unknown as FormStore['unregister'],
    setField: null as unknown as FormStore['setField'],
    getField: null as unknown as FormStore['getField'],
    resetField: null as unknown as FormStore['resetField'],
    setError: null as unknown as FormStore['setError'],
    getFieldState: null as unknown as FormStore['getFieldState'],
    watch: null as unknown as FormStore['watch'],
    trigger: null as unknown as FormStore['trigger'],
    reset: null as unknown as FormStore['reset'],
    handleSubmitEvent: null as unknown as FormStore['handleSubmitEvent'],
  });

  const context = {
    fieldMap,
    formStore,
  };

  formStore.isDirty = false;
  formStore.isValid = false;
  // formStore.isSubmitting = false;
  formStore.isSubmitSuccessful = false;
  formStore.submitCount = 0;
  formStore.dirtyFields = {};
  formStore.touchedFields = {};
  formStore.defaultValues = {};
  formStore.formState = {};
  formStore.errors = {};

  const register = (name: string) => {
    const f: {
      ref: HTMLElement | ((el: HTMLElement) => void);
      name: string;
      // onChange: JSX.EventHandlerUnion<HTMLElement, Event>;
    } = {
      ref: null as any,
      name,
      // onChange: null,
    };
    // check if field exists?
    fieldMap.set(name, f);

    return f;
  };
  formStore.register = register;

  const unregister = (name: string) => {
    // check if field exists?
    fieldMap.delete(name);
  };
  formStore.unregister = unregister;

  formStore.setField = () => {};
  formStore.getField = () => {};
  formStore.resetField = () => {};
  formStore.setError = () => {};
  formStore.getFieldState = (() => {}) as any;
  formStore.watch = () => {};
  formStore.trigger = () => {};
  formStore.reset = () => {};

  // const handleSubmitEvent: HandleSubmitEvent = (event) => (onSubmit) => {
  //   if (event) {
  //     event.preventDefault && event.preventDefault();
  //     // @ts-ignore
  //     event.persist && event.persist();
  //   }

  //   formStore.isSubmitting = true;

  //   console.log(onSubmit.constructor.name);

  //   // const onSubmit_async = promisify(onSubmit);
  //   // onSubmit_async(event)
  //   //   .then((value) => {
  //   //     console.log({ value });
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log({ error });
  //   //   })
  //   //   .finally(() => {
  //   //     formStore.isSubmitting = false;
  //   //   });

  //   try {
  //     onSubmit(event);
  //   } catch (error) {
  //     //
  //   } finally {
  //     formStore.isSubmitting = false;
  //   }
  // };
  formStore.handleSubmitEvent = handleSubmitEvent.bind(context);

  return formStore;
};
