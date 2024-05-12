import type { Component, JSX } from 'solid-js';

type TextFieldRootElement = HTMLDivElement;

// export type TextFieldForwardElement = HTMLInputElement;

type TextFieldAttrs = Omit<
  JSX.HTMLElementTags['div'],
  /* ----------------- omitted attrs ----------------- */
  | 'children'
  | 'innerHTML'
  | 'innerText'
  | 'textContent'
  | 'contentEditable'
  | 'contenteditable'
  | 'inputMode'
  | 'inputmode'
  /* ----------------- omitted attrs ----------------- */
>;

type TextFieldLabelProp = Omit<
  JSX.HTMLElementTags['label'],
  /* ----------------- omitted attrs ----------------- */
  'innerHTML' | 'innerText' | 'textContent' | 'for' | 'inputMode' | 'inputmode'
  /* ----------------- omitted attrs ----------------- */
>;

type TextFieldInputProp = Omit<
  JSX.HTMLElementTags['input'],
  /* ----------------- omitted attrs ----------------- */
  | 'innerHTML'
  | 'innerText'
  | 'textContent'
  | 'children'
  | 'accept'
  | 'checked'
  | 'height'
  | 'width'
  | 'src'
  | 'alt'
  | 'formaction'
  | 'formenctype'
  | 'formmethod'
  | 'formnovalidate'
  | 'formtarget'
  | 'contentEditable'
  | 'contenteditable'
  /* ----------------- omitted attrs ----------------- */
  /* ----------------- overwritten attrs ----------------- */
  | 'type'
> & {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
   */
  type?:
    | 'email'
    | 'password'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'url';
  /* ----------------- overwritten attrs ----------------- */
};

type TextFieldProps = {
  label?: TextFieldLabelProp;
  input?: TextFieldInputProp;
};

type TextFieldCustomAttrs = JSX.CustomAttributes<TextFieldRootElement>;

export type TextFieldAttrsAndProps = TextFieldAttrs &
  TextFieldCustomAttrs &
  TextFieldProps;

export type TextFieldComponent = Component<TextFieldAttrsAndProps>;
