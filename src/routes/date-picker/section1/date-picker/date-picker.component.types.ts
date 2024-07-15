import type { JSX, Component } from 'solid-js';

export type DatePickerForwardElement = HTMLInputElement;

export type DatePickerRef = (el: DatePickerForwardElement) => void;

export type DatePickerAttrs = Omit<
  JSX.IntrinsicElements['input'],
  /* --------------------------------- omitted attrs ------------------------- */
  // | 'type'
  // | 'accept'
  // | 'alt'
  // | 'capture'
  // | 'checked'
  // | 'dirname'
  // | 'formaction'
  // | 'formenctype'
  // | 'formtarget'
  // | 'height'
  // | 'maxlength'
  // | 'minlength'
  // | 'multiple'
  // | 'pattern'
  // | 'popovertarget'
  // | 'popovertargetaction'
  // | 'size'
  // | 'width'
  // | 'contenteditable'
  // | 'inputmode'
  // | 'inputmode'
  // | 'innerHTML'
  // | 'innerText'
  // //
  // | 'maxLength'
  // | 'minLength'
  // | 'contentEditable'
  // | 'formAction'
  // | 'formEnctype'
  // | 'formTarget'
  // | 'autoCapitalize'
  // | 'formmethod'
  // | 'formMethod'
  // | 'readOnly'
  // | 'crossOrigin'
  // | 'formNoValidate'
  /* --------------------------------- omitted attrs ------------------------- */
  /* ------------------------- overwritten attrs ------------------------- */
  'children'
  /* ------------------------- overwritten attrs ------------------------- */
> & {
  children?: JSX.Element | (() => JSX.Element);
};

export type DatePickerProps = {
  keepNativePicker?: boolean;
  // format?: string;
  // onOpen?: JSX.EventHandlerUnion<HTMLElement, Event>;
  // onClose?: JSX.EventHandlerUnion<HTMLElement, Event>;
};

export type DatePickerAttrsAndProps = DatePickerAttrs & DatePickerProps;

export type DatePickerComponent = Component<DatePickerAttrsAndProps>;
