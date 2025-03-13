import {
  createEffect,
  type JSX,
  onCleanup,
  onMount,
  children as toChildren,
} from 'solid-js';
import { createComponent } from 'solid-js/web';
import { activeModalSignal } from './modal.hook';
import type { ModalRef } from './modal.types';

export var modalsMap = new Map<string, ModalRef>();
window.modalsMap = modalsMap;

export const ModalTracker = (props: {
  name: string;
  children: JSX.Element | Element;
}) => {
  var children = toChildren(() => {
    return props.children;
  }) as unknown as () => HTMLDialogElement;

  modalsMap.set(props.name, children());

  var setActive = activeModalSignal[1];

  createEffect(() => {
    console.log(123131321, {
      c: children(),
      props,
      // 'props.children': props.children,
    });
  });

  // console.log(123131321, { c: children(), 'props.children': props.children });

  // onMount(() => {
  //   setActive(children());
  // });

  onCleanup(() => {
    setActive(null);
  });

  return children;
};
