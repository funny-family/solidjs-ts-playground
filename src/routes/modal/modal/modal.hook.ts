export var active: HTMLDialogElement | null = null;

export var useModal = () => {
  var modalsMap = new Map<string, HTMLDialogElement>();

  // var showModal: HTMLDialogElement['showModal'] = () => {
  //   //
  // };

  // var close: HTMLDialogElement['close'] = () => {
  //   //
  // };

  return {
    active,
    modalsMap,
    // showModal,
    // close,
  };
};
