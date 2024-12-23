import { createSignal } from 'solid-js';

export var activeModalSignal = createSignal<HTMLDialogElement | null>(null);

export var useModal = () => {
  var active = activeModalSignal[0];

  // var modalsMap = new Map<string, HTMLDialogElement>();

  // var showModal: HTMLDialogElement['showModal'] = () => {
  //   //
  // };

  // var close: HTMLDialogElement['close'] = () => {
  //   //
  // };

  return {
    active,
    // modalsMap,
    // showModal,
    // close,
  };
};
