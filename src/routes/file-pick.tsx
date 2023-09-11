import { onMount } from 'solid-js';
import {
  FilePicker,
  type FilePickerRef,
  filePickerExposeSymbol,
} from '~/components/file-picker/file-picker.components';

export const FilePick = () => {
  let filePickerRef = null as unknown as FilePickerRef;

  onMount(() => {
    console.log({ filePickerRef }, filePickerRef[filePickerExposeSymbol]);
    filePickerRef[filePickerExposeSymbol].logRef();
  });

  return (
    <div>
      <FilePicker ref={filePickerRef} />
    </div>
  );
};

export default FilePick;
