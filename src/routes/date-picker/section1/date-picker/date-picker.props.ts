import { splitProps } from 'solid-js';
import type { DatePickerAttrsAndProps } from './date-picker.component.types';

export var createSplittedProps = (attrsAndProps: DatePickerAttrsAndProps) => {
  const [props, inputAttrs, customAttrs, restAttrs] = splitProps(
    attrsAndProps,
    ['keepNativePicker'],
    [
      'accept',
      'alt',
      'autocomplete',
      'autocorrect',
      'autofocus',
      'capture',
      'checked',
      'crossorigin',
      'disabled',
      'enterkeyhint',
      'form',
      'formaction',
      'formenctype',
      'formmethod',
      'formnovalidate',
      'formtarget',
      'height',
      'incremental',
      'list',
      'max',
      'maxlength',
      'min',
      'minlength',
      'multiple',
      'name',
      'pattern',
      'placeholder',
      'readonly',
      'results',
      'required',
      'size',
      'src',
      'step',
      'type',
      'value',
      'width',
      'crossOrigin',
      'formAction',
      'formEnctype',
      'formMethod',
      'formNoValidate',
      'formTarget',
      'maxLength',
      'minLength',
      'readOnly',
    ],
    ['ref', 'classList', '$ServerOnly']
  );

  return {
    props,
    inputAttrs,
    customAttrs,
    restAttrs,
  };
};
