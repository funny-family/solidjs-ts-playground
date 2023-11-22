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
} from 'solid-js';
import { Portal } from 'solid-js/web';
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

const Input: Component<JSX.IntrinsicElements['input']> = (attrs) => {
  const dataElId = createUniqueId();

  return (
    <div
      data-root-el={dataElId}
      style={{
        'display': 'inline-flex',
        'flex-direction': 'column',
        'border': '1px solid red',
      }}
    >
      <input
        {...attrs}
        type={attrs?.type || 'text'}
        data-forward-el={dataElId}
      />
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

  console.log(12313131, resolvedChildren(), resolvedLabel());

  // resolvedLabel().htmlFor =
  //   valueOrNullOf(resolvedLabel().htmlFor) ||
  //   valueOrNullOf(getForwardEl(resolvedChildren())!.id) ||
  //   createUniqueId();

  if (resolvedChildren() != null) {
    resolvedChildren().insertAdjacentElement(
      'afterbegin',
      resolvedLabel() as Element
    );
  }

  return resolvedChildren();
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

  // createEffect(
  //   on(
  //     () => resolvedHelperText(),
  //     (v) => {
  //       if (v != null) {
  //         resolvedChildren().insertAdjacentElement('beforeend', v);
  //       } else {
  //         console.log(v);
  //         resolvedChildren().removeChild(v);
  //       }
  //     }
  //   )
  // );

  onMount(() => {
    console.log('"InputWithHelperText" mount!');
  });

  onCleanup(() => {
    console.log('"InputWithHelperText" cleanup!');
  });

  createEffect(() => {
    console.log(resolvedChildren(), resolvedHelperText());
  });

  // console.log({
  //   children: resolvedChildren(),
  //   helperText: resolvedHelperText(),
  // });

  if (resolvedHelperText() != null) {
    resolvedChildren().insertAdjacentElement('beforeend', resolvedHelperText());
  }

  return resolvedChildren();
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
