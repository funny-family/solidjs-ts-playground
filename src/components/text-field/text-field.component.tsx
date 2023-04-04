import {
  Show,
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
type TextFieldAttrs = Omit<JSX.HTMLElementTags['div'], 'children'>;
type TextFieldProps = {
  label?: Omit<
    JSX.HTMLElementTags['label'],
    // omitted attrs
    'for'
  >;
  input?: Omit<
    JSX.HTMLElementTags['input'],
    // omitted attrs
    | 'children'
    | 'accept'
    | 'checked'
    | 'height'
    | 'width'
    | 'list'
    | 'src'
    // overwritten attrs
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
    ['label', 'input'],
    solidjsCustomAttrs
  );

  console.log('"TextField" attrsAndProps:', attrsAndProps);

  const rootPropsClass = () => attrs?.class || '';

  const labelClass = () => `${props?.label?.class || ''} text-field__label`;

  const inputClass = () => `${props?.input?.class || ''} text-field__input`;
  const inputType = () => props?.input?.type || 'text';
  const inputId = createMemo(() => props?.input?.id || createUniqueId());

  return (
    <div {...customAttrs} class={`${rootPropsClass()} text-field`}>
      <Show when={props?.label != null} fallback={null} keyed>
        {() => (
          <label {...props.label} for={inputId()} class={labelClass()}>
            {props?.label?.children}
          </label>
        )}
      </Show>
      <input
        {...props?.input}
        // @ts-ignore
        accept={/*@once*/ null}
        // @ts-ignore
        children={/*@once*/ null}
        // @ts-ignore
        accept={/*@once*/ null}
        // @ts-ignore
        checked={/*@once*/ null}
        // @ts-ignore
        height={/*@once*/ null}
        // @ts-ignore
        width={/*@once*/ null}
        // @ts-ignore
        list={/*@once*/ null}
        // @ts-ignore
        src={/*@once*/ null}
        class={inputClass()}
        type={inputType()}
        id={inputId()}
      />
    </div>
  );
};
