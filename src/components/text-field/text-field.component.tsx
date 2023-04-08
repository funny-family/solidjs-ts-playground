import {
  Show,
  children,
  createMemo,
  createUniqueId,
  mergeProps,
  splitProps,
} from 'solid-js';
import type { Component, JSX } from 'solid-js';
import { solidjsCustomAttrs } from '~/utils/attrs';
import './text-field.styles.css';

type TextFieldRootElementTag = JSX.HTMLElementTags['div'];
type TextFieldRootElement = HTMLDivElement;
type TextFieldForwardElement = HTMLInputElement;
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
    'innerHTML' | 'innerText' | 'textContent' | 'for'
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
    | 'list'
    | 'src'
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
type TextFieldAttrsAndProps = TextFieldAttrs &
  TextFieldCustomAttrs &
  TextFieldProps;
type TextFieldComponent = Component<TextFieldAttrsAndProps>;
// var a: TextFieldAttrsAndProps = {
//   input: {
//     type
//   }
// }
// export let TextField = undefined as unknown as CounterComponent;
// TextField = ((attrsAndProps) => {}) satisfies TextFieldComponent;
export const TextField: TextFieldComponent = (attrsAndProps) => {
  /* ----------------- feels like a big mess ----------------- */
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
  /* ----------------- feels like a big mess ----------------- */

  const [rootCustomAttrs, props, rootAttrs] = splitProps(
    attrsAndProps,
    // omittedAttrsAndProps,
    solidjsCustomAttrs,
    ['label', 'input']
  );

  console.log('"TextField" attrsAndProps:', attrsAndProps);

  const rootClassAttr = () => `${rootAttrs?.class || ''} text-field`;

  const labelClassAttr = () => `${props?.label?.class || ''} text-field__label`;

  const inputClassAttr = () => `${props?.input?.class || ''} text-field__input`;
  /* ----------------- validation of "props?.input?.type" prop ----------------- */
  const inputTypeAttr = () => {
    const defaultType: NonNullable<
      NonNullable<TextFieldAttrsAndProps['input']>['type']
    > = 'text';
    const type = props?.input?.type || defaultType;

    if (
      !(
        [
          'email',
          'number',
          'password',
          'search',
          'tel',
          'text',
          'url',
        ] satisfies NonNullable<
          NonNullable<TextFieldAttrsAndProps['input']>['type']
        >[]
      ).includes(type)
    ) {
      return defaultType;
    }

    return type;
  };
  /* ----------------- validation of "props?.input?.type" prop ----------------- */

  const inputIdAttr = createMemo(() => props?.input?.id || createUniqueId());

  return (
    <div
      {...rootCustomAttrs}
      {...rootAttrs}
      // @ts-ignore
      contentEditable={null}
      // @ts-ignore
      contenteditable={null}
      class={rootClassAttr()}
    >
      <Show when={props?.label != null} fallback={null} keyed>
        {() => (
          <label
            /* ----------------- omitted attrs ----------------- */
            // there must be use only one attribute of this at the time "children", "innerText", "innerHtml" or "textContent"
            // @ts-ignore
            // innerHTML={null}
            /* ----------------- omitted attrs ----------------- */
            {...props.label}
            for={inputIdAttr()}
            class={labelClassAttr()}
          />
        )}
      </Show>
      <input
        {...props?.input}
        /* ----------------- omitted attrs ----------------- */
        // @ts-ignore
        accept={null}
        // @ts-ignore
        checked={null}
        // @ts-ignore
        height={null}
        // @ts-ignore
        width={null}
        // @ts-ignore
        list={null}
        // @ts-ignore
        src={null}
        /* ----------------- omitted attrs ----------------- */
        class={inputClassAttr()}
        type={inputTypeAttr()}
        id={inputIdAttr()}
      />
    </div>
  );
};
