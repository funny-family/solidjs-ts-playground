import type {
  TextFieldAttrsAndProps,
  TextFieldComponent,
} from './text-field.types';
import { Show, createMemo, createUniqueId, splitProps } from 'solid-js';
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
      inputMode={null}
      inputmode={null}
      contentEditable={null}
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
        /* ----------------- omitted attrs ----------------- */
        class={inputClassAttr()}
        type={inputTypeAttr()}
        id={inputIdAttr()}
      />
    </div>
  );
};
