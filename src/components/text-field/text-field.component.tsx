import {
  createMemo,
  createUniqueId,
  mergeProps,
  splitProps,
} from 'solid-js';
import type { Component, JSX } from 'solid-js';
import { solidjsCustomAttrs } from '~/utils/attrs';
import './text-field.styles.css';

type TextFieldRootElement = HTMLDivElement;
type TextFieldForwardElement = HTMLInputElement;
type TextFieldAttrs = JSX.HTMLElementTags['div'];
type TextFieldProps = {
  label?: JSX.Element;
  forwardProps?: Omit<
    JSX.HTMLElementTags['input'],
    'type' | 'accept' | 'checked' | 'height' | 'width' | 'list' | 'src'
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
};
type TextFieldCustomAttrs = JSX.CustomAttributes<TextFieldRootElement>;
type TextFieldAttrsAndProps = TextFieldAttrs &
  TextFieldCustomAttrs &
  TextFieldProps;
type TextFieldComponent = Component<TextFieldAttrsAndProps>;

export const TextField: TextFieldComponent = (attrsAndProps) => {
  // console.log(23424, attrsAndProps);

  // const forwardProps = { ...attrsAndProps.forwardProps };
  // delete attrsAndProps.forwardProps;
  // const rootElementAttrsAndProps = {
  //   class: '',
  // } satisfies Omit<TextFieldAttrsAndProps, 'forwardProps'>;
  // const forwardElementAttrsAndProps = {
  //   class: '',
  //   type: 'text',
  //   ...forwardProps,
  // } satisfies Pick<TextFieldAttrsAndProps, 'forwardProps'>['forwardProps'];
  // attrsAndProps = mergeProps(rootElementAttrsAndProps, attrsAndProps);
  // attrsAndProps.forwardProps = mergeProps(forwardElementAttrsAndProps);
  // type AttrsAndProps = TextFieldAttrsAndProps &
  //   typeof rootElementAttrsAndProps & {
  //     forwardProps: typeof forwardElementAttrsAndProps;
  //   };

  const [props, customAttrs, attrs] = splitProps(
    attrsAndProps,
    ['label', 'forwardProps'],
    solidjsCustomAttrs
  );

  console.log('"TextField" attrsAndProps:', attrsAndProps);

  const rootPropsClass = () => attrs?.class || '';
  const forwardPropsClass = () => props?.forwardProps?.class || '';
  const forwardPropsType = () => props?.forwardProps?.type || 'text';
  const forwardPropsId = createMemo(
    () => props?.forwardProps?.id || createUniqueId()
  );

  return (
    <div {...customAttrs} class={`${rootPropsClass()} text-field`}>
      {props?.label != null ? (
        <label class="text-field__label" for={forwardPropsId()}>
          {props.label}
        </label>
      ) : null}
      <input
        {...props?.forwardProps}
        class={`${forwardPropsClass()} text-field__input`}
        type={forwardPropsType()}
        id={forwardPropsId()}
      />
    </div>
  );
};
