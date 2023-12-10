import {
  type JSX,
  getOwner,
  sharedConfig,
  createEffect,
  createSignal,
  createRoot,
  onCleanup,
  runWithOwner,
  createMemo,
} from 'solid-js';
import { insert } from 'solid-js/web';

export const Teleport = (props: { to: Element; children: JSX.Element }) => {
  const marker = document.createTextNode('');
  const mount = () => props.to;
  const owner = getOwner();
  let content: undefined | (() => JSX.Element);
  let hydrating = !!sharedConfig.context;

  createEffect(
    () => {
      // basically we backdoor into a sort of renderEffect here
      if (hydrating) (getOwner() as any).user = hydrating = false;

      content ||
        (content = runWithOwner(owner, () => createMemo(() => props.children)));
      const el = mount();

      const { 0: clean, 1: setClean } = createSignal(false);
      const cleanup = () => setClean(true);

      createRoot((dispose) =>
        insert(el, () => (!clean() ? content!() : dispose()), null)
      );

      onCleanup(cleanup);
    },
    undefined,
    // @ts-ignore
    { render: !hydrating }
  );

  return marker;
};
