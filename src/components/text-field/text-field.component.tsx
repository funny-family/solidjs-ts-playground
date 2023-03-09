import { createUniqueId, mergeProps, Show, splitProps } from 'solid-js';
import type { Component, JSX } from 'solid-js';
import './text-field.styles.css';
import { solidjsCustomAttrs } from '~/utils/attrs';
import type { KeysOf, Override } from '~/@types';

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
type TextFieldExportedComponent = Component<TextFieldAttrsAndProps>;
type TextFieldLocalComponent = Component<TextFieldAttrsAndProps>;
type TextFieldComponent = Component<TextFieldAttrsAndProps>;

// export let TextField = undefined as unknown as TextFieldComponent;
export const TextField: TextFieldComponent = (attrsAndProps) => {
  const forwardProps = { ...attrsAndProps.forwardProps };
  delete attrsAndProps.forwardProps;
  const rootElementAttrsAndProps = {
    class: '',
  } satisfies Omit<TextFieldAttrsAndProps, 'forwardProps'>;
  const forwardElementAttrsAndProps = {
    class: '',
    type: 'text',
    ...forwardProps,
  } satisfies Pick<TextFieldAttrsAndProps, 'forwardProps'>['forwardProps'];
  attrsAndProps = mergeProps(rootElementAttrsAndProps, attrsAndProps);
  attrsAndProps.forwardProps = mergeProps(forwardElementAttrsAndProps);
  type AttrsAndProps = TextFieldAttrsAndProps &
    typeof rootElementAttrsAndProps & {
      forwardProps: typeof forwardElementAttrsAndProps;
    };

  const [props, customAttrs, attrs] = splitProps(
    attrsAndProps as AttrsAndProps,
    ['label', 'forwardProps'],
    solidjsCustomAttrs
  );
  console.log(2, attrsAndProps);
  const inputId = props.forwardProps?.id || createUniqueId();

  return (
    <div {...customAttrs} class={`${attrs.class} text-field`}>
      <Show
        when={props.label != null}
        fallback={null}
        children={
          <label class="text-field__label" for={inputId}>
            {props.label}
          </label>
        }
      />
      <input
        {...props.forwardProps}
        class={`${props.forwardProps.class} text-field__input`}
        type={props.forwardProps.type}
        id={inputId}
      />
    </div>
  );
};
