import { type JSX, type Component, splitProps } from 'solid-js';

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

export type FilePickerExpose = {
  logRef: VoidFunction;
};

export type FilePickerRef = HTMLInputElement & {
  [filePickerExposeSymbol]: FilePickerExpose;
};

export const filePickerExposeSymbol = Symbol(
  'file-picker-expose-symbol'
) as unknown as 'file-picker-expose-symbol';

// https://stackoverflow.com/questions/25810051/filereader-api-on-big-files
// https://www.digitalocean.com/community/tutorials/js-file-reader
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/result

export const FilePicker: FilePickerComponent = (attrsAndProps) => {
  const { 0: props, 1: attrs } = splitProps(attrsAndProps, []);

  let ref = attrs?.ref as FilePickerRef;

  const fileReader = new FileReader();

  const logRef: FilePickerExpose['logRef'] = () => {
    console.log('ref:', ref);
  };

  return (
    <input
      {...attrs}
      type="file"
      ref={(el) => {
        (ref as HTMLInputElement) = el;
        ref[filePickerExposeSymbol] = {
          logRef: null as unknown as FilePickerExpose['logRef'],
        };
        ref[filePickerExposeSymbol].logRef = logRef;
      }}
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
