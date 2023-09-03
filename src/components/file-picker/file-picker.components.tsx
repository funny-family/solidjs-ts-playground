import { type JSX, type Component, splitProps, onMount } from 'solid-js';

export type FilePickerAttrs = Omit<
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
  | 'min'
  | 'minlength'
  | 'minLength'
  | 'max'
  | 'maxlength'
  | 'maxLength'
  | 'pattern'
  | 'step'
  | 'autocomplete'
  | 'autocomplete'
  | 'autocapitalize'
  | 'autoCapitalize'
  | 'alt'
  | 'readonly'
  | 'readOnly'
  /* ----------------- omitted attrs ----------------- */
>;

export type FilePickerProps = {};

export type FilePickerAttrsAndProps = FilePickerAttrs & FilePickerProps;

export type FilePickerComponent = Component<FilePickerAttrsAndProps>;

export type FilePickerRef = HTMLInputElement & Record<string, any>;

export const filePickerExposeSymbol = Symbol(
  'file-picker-expose-symbol'
) as unknown as string;

export const FilePicker: FilePickerComponent = (attrsAndProps) => {
  const { 0: props, 1: attrs } = splitProps(attrsAndProps, []);

  let ref = attrs?.ref as FilePickerRef;

  const logRef = () => {
    console.log('ref:', { ref });
  };

  onMount(() => {
    ref[filePickerExposeSymbol] ||= {};
    ref[filePickerExposeSymbol].logRef = logRef;

    // console.log('ref:', { ref });
    logRef();
  });

  return (
    <input
      {...attrs}
      type="file"
      ref={(el) => (ref = el)}
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
      min={null}
      minlength={null}
      minLength={null}
      max={null}
      maxlength={null}
      maxLength={null}
      pattern={null}
      step={null}
      autocomplete={null}
      autocapitalize={null}
      autoCapitalize={null}
      alt={null}
      readonly={null}
      readOnly={null}
    />
  );
};
