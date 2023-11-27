import {
  type JSX,
  createEffect,
  sharedConfig,
  getOwner,
  onCleanup,
  runWithOwner,
  createMemo,
} from 'solid-js';
import { insert } from 'solid-js/web';

export const InsertAdjacentElement = (props: {
  position: InsertPosition;
  targetElement: Element;
  children: JSX.Element;
}) => {
  const marker = document.createTextNode('');
  const mount = () => props.targetElement;
  const owner = getOwner();
  let content: undefined | (() => JSX.Element);
  let hydrating = !!sharedConfig.context;

  createEffect(
    () => {
      if (hydrating) {
        (getOwner() as any).user = hydrating = false;
      }

      content ||
        (content = runWithOwner(owner, () => createMemo(() => props.children)));
      const el = mount();
      const container = mount();
      const renderRoot = container;

      Object.defineProperty(container, '_$host', {
        get() {
          return marker.parentNode;
        },
        configurable: true,
      });

      insert(renderRoot, content);

      try {
        el.insertAdjacentElement(props.position, container);
      } catch (error) {
        console.log({ error });
      }

      onCleanup(() => {
        console.log({ el, container });

        el.removeChild(container);
      });
    },
    undefined,
    // @ts-ignore
    { render: !hydrating }
  );

  return marker;
};
