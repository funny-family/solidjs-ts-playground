import { onCleanup, onMount, type JSX } from 'solid-js';

export const ModalTracker = (props: { children: JSX.Element }) => {
  onMount(() => {
    //
  });

  onCleanup(() => {
    //
  });

  return props.children;
};
