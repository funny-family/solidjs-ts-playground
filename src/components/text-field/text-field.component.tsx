import type {
  TextFieldAttrsAndProps,
  TextFieldComponent,
} from './text-field.types';
import { Show, createMemo, createUniqueId, splitProps } from 'solid-js';
import { solidjsCustomAttrs } from '~/utils/attrs';
import './text-field.styles.css';

export const TextField: TextFieldComponent = (attrsAndProps) => {
  const {
    0: rootCustomAttrs,
    1: props,
    2: rootAttrs,
  } = splitProps(attrsAndProps, solidjsCustomAttrs, ['label', 'input']);

  console.log('"TextField" attrsAndProps:', attrsAndProps);

  const rootClassAttr = () => `${rootAttrs?.class || ''} text-field`;
  const labelClassAttr = () => `${props?.label?.class || ''} text-field__label`;
  const inputClassAttr = () => `${props?.input?.class || ''} text-field__input`;

  /* ----------------- validation of "props?.input?.type" prop ----------------- */
  type NonNullableTextFieldAttrType = NonNullable<
    TextFieldAttrsAndProps['input']
  >['type'];

  const inputTypeAttr = () => {
    const defaultAttr: NonNullableTextFieldAttrType = 'text';
    const attr = props?.input?.type || defaultAttr;
    /**
     * @see https://superuser.com/a/1630792
     */
    if (
      // !(
      //   [
      //     'email',
      //     'number',
      //     'password',
      //     'search',
      //     'tel',
      //     'text',
      //     'url',
      //   ] satisfies NonNullable<NonNullableTextFieldAttrType>[]
      // ).includes(attr)
      !/^(email|number|password|search|tel|text|url)$/.exec(attr)
    ) {
      return defaultAttr;
    }

    return attr;
  };
  /* ----------------- validation of "props?.input?.type" prop ----------------- */
  const inputIdAttr = createMemo(() => props?.input?.id || createUniqueId());

  return (
    <div
      /* ----------------- solidjs custom attrs ----------------- */
      $ServerOnly={rootCustomAttrs.$ServerOnly}
      classList={rootCustomAttrs.classList}
      ref={rootCustomAttrs.ref}
      /* ----------------- solidjs custom attrs ----------------- */
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
