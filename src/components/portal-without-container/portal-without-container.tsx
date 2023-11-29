import {
  getOwner,
  sharedConfig,
  type JSX,
  createEffect,
  createMemo,
  runWithOwner,
  createSignal,
  createRoot,
  onCleanup,
} from 'solid-js';
import { insert } from 'solid-js/web';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

function createElement(
  tagName: string,
  isSVG = false
): HTMLElement | SVGElement {
  return isSVG
    ? document.createElementNS(SVG_NAMESPACE, tagName)
    : document.createElement(tagName);
}

export function PortalWithoutContainer<
  T extends boolean = false,
  S extends boolean = false
>(props: {
  mount?: Node;
  isSVG?: S;
  ref?:
    | (S extends true ? SVGGElement : HTMLDivElement)
    | ((
        el: (T extends true ? { readonly shadowRoot: ShadowRoot } : {}) &
          (S extends true ? SVGGElement : HTMLDivElement)
      ) => void);
  children: JSX.Element;
}) {
  const marker = document.createTextNode('');
  const mount = () => props.mount || document.body;
  const owner = getOwner();
  // let content: undefined | (() => JSX.Element);
  let content: () => HTMLElement
  ;

  let hydrating = !!sharedConfig.context;

  createEffect(
    () => {
      // basically we backdoor into a sort of renderEffect here
      if (hydrating) (getOwner() as any).user = hydrating = false;
      content ||
        (content = runWithOwner(owner, () => createMemo(() => props.children)));
      const el = mount();

      if (el instanceof HTMLHeadElement) {
        const [clean, setClean] = createSignal(false);
        const cleanup = () => setClean(true);

        createRoot((dispose) =>
          insert(el, () => (!clean() ? content!() : dispose()), null)
        );

        onCleanup(cleanup);
      } else {
        // const container = createElement(props.isSVG ? 'g' : 'div', props.isSVG),
        //   renderRoot =
        //     useShadow && container.attachShadow
        //       ? container.attachShadow({ mode: 'open' })
        //       : container;

        // const renderRoot =
        //   useShadow && container.attachShadow
        //     ? container.attachShadow({ mode: 'open' })
        //     : container;

        Object.defineProperty(el, '_$host', {
          get() {
            return marker.parentNode;
          },
          configurable: true,
        });

        console.log(content());

        insert(el, content());
        el.appendChild(content());
        props.ref && (props as any).ref(content());

        onCleanup(() => el.removeChild(content()));
      }
    },
    undefined,
    { render: !hydrating }
  );
  return marker;
}
