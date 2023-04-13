import type { Component, JSX } from 'solid-js';

type TextFieldRootElement = HTMLDivElement;

// export type TextFieldForwardElement = HTMLInputElement;

type TextFieldAttrs = Omit<
  JSX.HTMLElementTags['div'],
  | 'children'
  | 'innerHTML'
  | 'innerText'
  | 'textContent'
  | 'contentEditable'
  | 'contenteditable'
>;

type TextFieldProps = {
  label?: Omit<
    JSX.HTMLElementTags['label'],
    /* ----------------- omitted attrs ----------------- */
    | 'innerHTML'
    | 'innerText'
    | 'textContent'
    | 'for'
    | 'inputMode'
    | 'inputmode'
    /* ----------------- omitted attrs ----------------- */
  >;
  input?: Omit<
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
  };
  /* ----------------- overwritten attrs ----------------- */
};

type TextFieldCustomAttrs = JSX.CustomAttributes<TextFieldRootElement>;

export type TextFieldAttrsAndProps = TextFieldAttrs &
  TextFieldCustomAttrs &
  TextFieldProps;

export type TextFieldComponent = Component<TextFieldAttrsAndProps>;
