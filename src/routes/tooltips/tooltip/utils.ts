export var transitionEndListenersMap = new Map<
  string,
  (event: DocumentEventMap['transitionend']) => any
>();

globalThis.transitionEndListenersMap = transitionEndListenersMap;

document.addEventListener(
  'transitionend',
  (event) => {
    transitionEndListenersMap.forEach((listener) => {
      listener(event);
    });
  },
  true
);
