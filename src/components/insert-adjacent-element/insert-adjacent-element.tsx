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
      // const container = mount();

      Object.defineProperty(el, '_$host', {
        get() {
          return marker.parentNode;
        },
        configurable: true,
      });

      console.log({ el, content, 'content()': content!() });

      insert(el, content);

      if (content!() != null) {
        el.insertAdjacentElement(
          props.position,
          content!() as unknown as HTMLElement
        );
      }

      onCleanup(() => {
        console.log('"onCleanup":', { el, content, c: content!() });

        if (content!() != null) {
          el.removeChild(content!() as unknown as HTMLElement);
        }
      });
    },
    undefined,
    // @ts-ignore
    { render: !hydrating }
  );

  return marker;
};
