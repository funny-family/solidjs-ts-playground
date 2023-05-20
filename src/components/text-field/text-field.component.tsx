import type {
  TextFieldAttrsAndProps,
  TextFieldComponent,
} from './text-field.types';
import { Show, createMemo, createUniqueId, splitProps } from 'solid-js';
import type { Accessor } from 'solid-js';
import { solidjsCustomAttrs } from '~/utils/attrs';
import './text-field.styles.css';

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

  const {
    0: rootCustomAttrs,
    1: props,
    2: rootAttrs,
  } = splitProps(
    attrsAndProps,
    // omittedAttrsAndProps,
    solidjsCustomAttrs,
    ['label', 'input']
  );

  console.log('"TextField" attrsAndProps:', attrsAndProps);

  const rootClassAttr: Accessor<string> = (attr = rootAttrs?.class || '') =>
    `${attr} text-field`;
  const labelClassAttr: Accessor<string> = (attr = props?.label?.class || '') =>
    `${attr} text-field__label`;
  const inputClassAttr: Accessor<string> = (attr = props?.input?.class || '') =>
    `${attr} text-field__input`;
  /* ----------------- validation of "props?.input?.type" prop ----------------- */
  type NonNullableTextFieldAttrType = NonNullable<
    TextFieldAttrsAndProps['input']
  >['type'];

  const inputTypeAttr: Accessor<string> = (
    defaultAttr: NonNullableTextFieldAttrType = 'text',
    attr: NonNullableTextFieldAttrType = props?.input?.type || defaultAttr
  ) =>
    !(
      [
        'email',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'url',
      ] satisfies NonNullable<NonNullableTextFieldAttrType>[]
    ).includes(attr)
      ? defaultAttr
      : attr;
  /* ----------------- validation of "props?.input?.type" prop ----------------- */
  const inputIdAttr = createMemo(() => props?.input?.id || createUniqueId());

  return (
    <div
      /* ----------------- solidjs custom attrs ----------------- */
      $ServerOnly={rootCustomAttrs.$ServerOnly}
      classList={rootCustomAttrs.classList}
      ref={rootCustomAttrs.ref}
      /* ----------------- solidjs custom attrs ----------------- */
      /*  */
      {...rootAttrs}
      class={rootClassAttr()}
      inputMode={null}
      inputmode={null}
      contentEditable={null}
      contenteditable={null}
    >
      <Show when={props?.label != null} fallback={null}>
        {() => (
          <label
            // there must be use only one attribute of this at the time "children", "innerText", "innerHtml" or "textContent"
            // innerHTML={null}
            {...props.label}
            for={inputIdAttr()}
            class={labelClassAttr()}
            /* ----------------- omitted attrs ----------------- */
            inputMode={null}
            inputmode={null}
            /* ----------------- omitted attrs ----------------- */
          />
        )}
      </Show>
      <input
        {...props?.input}
        class={inputClassAttr()}
        type={inputTypeAttr()}
        id={inputIdAttr()}
        /* ----------------- omitted attrs ----------------- */
        accept={null}
        checked={null}
        height={null}
        width={null}
        src={null}
        alt={null}
        formaction={null}
        formenctype={null}
        formmethod={null}
        formnovalidate={null}
        formtarget={null}
        contentEditable={null}
        contenteditable={null}
        /* ----------------- omitted attrs ----------------- */
      />
    </div>
  );
};
