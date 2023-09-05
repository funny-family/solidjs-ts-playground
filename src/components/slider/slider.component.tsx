import { type JSX, type Component, splitProps } from 'solid-js';

export type SliderAttrs = Omit<
  JSX.HTMLElementTags['input'],
  /* ----------------- omitted attrs ----------------- */
  | 'type'
  | 'children'
  | 'innerHTML'
  | 'innerText'
  | 'textContent'
  | 'contentEditable'
  | 'contenteditable'
  | 'inputMode'
  | 'inputmode'
  | 'checked'
  | 'width'
  | 'height'
  | 'minlength'
  | 'minLength'
  | 'maxlength'
  | 'maxLength'
  | 'pattern'
  | 'autocomplete'
  | 'autocomplete'
  | 'autocapitalize'
  | 'autoCapitalize'
  | 'alt'
  | 'readonly'
  | 'readOnly'
  /* ----------------- omitted attrs ----------------- */
>;

export type SliderProps = {};

export type SliderAttrsAndProps = SliderAttrs & SliderProps;

export type SliderComponent = Component<SliderAttrsAndProps>;

export type SliderRef = HTMLInputElement;

export const Slider: SliderComponent = (attrsAndProps) => {
  const { 0: props, 1: attrs } = splitProps(attrsAndProps, []);

  let ref = attrs?.ref as SliderRef;

  return (
    <div
      class={attrs?.class}
      classList={attrs?.classList}
      style={attrs?.style}
      $ServerOnly={attrs?.$ServerOnly}
    >
      <input
        {...attrs}
        type="range"
        ref={(el) => {
          (ref as HTMLInputElement) = el;
        }}
        class={null}
        classList={null}
        style={null}
        children={null}
        innerHTML={null}
        innerText={null}
        textContent={null}
        contentEditable={null}
        contenteditable={null}
        inputMode={null}
        inputmode={null}
        checked={null}
        width={null}
        height={null}
        minlength={null}
        minLength={null}
        maxlength={null}
        maxLength={null}
        pattern={null}
        autocomplete={null}
        autocapitalize={null}
        autoCapitalize={null}
        alt={null}
        readonly={null}
        readOnly={null}
      />
    </div>
  );
};
