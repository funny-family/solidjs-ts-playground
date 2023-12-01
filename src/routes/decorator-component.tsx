import {
  type JSX,
  type Component,
  children,
  createUniqueId,
  onMount,
  createSignal,
  Show,
  createEffect,
  on,
  onCleanup,
  getOwner,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { InsertAdjacentElement } from '~/components/insert-adjacent-element/insert-adjacent-element';
import { PortalWithoutContainer } from '~/components/portal-without-container/portal-without-container';
// import { Transition } from 'solid-transition-group';

const valueOrNullOf = <T extends any>(value: T) =>
  !!value === true ? value : null;

const getForwardEl = <T extends HTMLElement>(el: T) => {
  return el.querySelector(`[data-forward-el="${el.dataset.rootEl}"]`);
};

// const Div = (() => {
//   const Component: Component<JSX.IntrinsicElements['div']> = (attrs) => {
//     return <div {...attrs} />;
//   };

//   Component.sayHi = () => {
//     console.log('Hi!');
//   };

//   return Component;
// })();

const inputExposeSymbol = Symbol('input');

const Input: Component<JSX.IntrinsicElements['input']> = (attrs) => {
  const dataElId = createUniqueId();
  // let ref = null as unknown as HTMLInputElement;

  // onMount(() => {
  //   console.log({ ref });
  // });

  return (
    <div
      data-root-el={dataElId}
      style={{
        'display': 'inline-flex',
        'flex-direction': 'column',
        'border': '1px solid red',
      }}
    >
      {/* @ts-ignore */}
      {/* {ref?.[inputExposeSymbol].labelSlot || null} */}
      <input
        {...attrs}
        // ref={(el) => {
        //   (ref as HTMLInputElement) = el;
        //   // @ts-ignore
        //   ref[inputExposeSymbol] = {
        //     labelSlot: null,
        //     helperTextSlot: null,
        //   };
        // }}
        type={attrs?.type || 'text'}
        data-forward-el={dataElId}
      />
      {/* @ts-ignore */}
      {/* {ref?.[inputExposeSymbol].helperTextSlot || null} */}
    </div>
  );
};

const InputWithLabel = (props: {
  children: JSX.Element;
  label: JSX.Element;
}) => {
  const resolvedChildren = children(
    () => props.children
  ) as unknown as () => HTMLElement;

  const resolvedLabel = children(
    () => props.label
  ) as unknown as () => HTMLLabelElement;

  return (
    <>
      <Portal mount={resolvedChildren()}>{resolvedLabel()}</Portal>
      {resolvedChildren()}
    </>
  );
};

const InputLabel: Component<JSX.IntrinsicElements['label']> = (attrs) => {
  return <label {...attrs} style={{ 'font-weight': 500 }} />;
};

const InputWithHelperText = (props: {
  children: JSX.Element;
  helperText: JSX.Element;
}) => {
  const resolvedChildren = children(
    () => props.children
  ) as unknown as () => HTMLElement;

  const resolvedHelperText = children(
    () => props.helperText
  ) as unknown as () => HTMLElement;

  // return (
  //   <>
  //     <PortalWithoutContainer mount={resolvedChildren()}>
  //       {resolvedHelperText()}
  //     </PortalWithoutContainer>
  //     {resolvedChildren()}
  //   </>
  // );

  const owner = getOwner();
  console.log(12313, { el: resolvedChildren(), owner });

  return (
    <>
      <InsertAdjacentElement
        position="beforeend"
        targetElement={resolvedChildren()}
      >
        {resolvedHelperText()}
      </InsertAdjacentElement>
      {resolvedChildren()}
    </>
  );

  // return resolvedChildren();
};

const InputHelperText: Component<JSX.IntrinsicElements['div']> = (attrs) => {
  return <div {...attrs} style={{ 'font-size': '14px' }} />;
};

const DecoratorComponent = () => {
  const [helperTextVisibility, setHelperTextVisibility] = createSignal(true);
  const [portalElementVisibility, setPortalElementVisibility] =
    createSignal(true);

  let inputRef = null;
  // let adad;

  // onMount(() => {
  //   console.log({ inputRef, adad });
  // });

  // Div.sayHi();

  return (
    <section>
      <h1>Decorator component test</h1>
      {/* <Div>123131321</Div> */}
      <section>
        <h1>Input with label</h1>

        <div>
          <button
            type="button"
            onClick={() => {
              setPortalElementVisibility(!portalElementVisibility());
            }}
          >
            show/hide "portal element"
          </button>

          <Portal>
            <Show when={portalElementVisibility()} fallback={null}>
              <div class="kajhdad87t34">Hello form body!</div>
            </Show>
          </Portal>
        </div>

        <p>
          <button
            type="button"
            onClick={() => {
              setHelperTextVisibility(!helperTextVisibility());
            }}
          >
            show/hide "helperText"
          </button>
        </p>
        <p>
          <InputWithHelperText
            helperText={
              <Show when={helperTextVisibility()} fallback={null}>
                <InputHelperText>This is helper text!</InputHelperText>
              </Show>
            }
          >
            <Input ref={inputRef} id={createUniqueId()} />
          </InputWithHelperText>
        </p>
      </section>
    </section>
  );
};

export default DecoratorComponent;
