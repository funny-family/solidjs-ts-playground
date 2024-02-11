import {
  type JSX,
  Show,
  children,
  createEffect,
  createSignal,
  onCleanup,
  createUniqueId,
} from 'solid-js';
import { insert } from 'solid-js/web';
import { InputTest } from './input-test/input-test.component';

// https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement#visualization_of_position_names

var unwrapSignal = <TValue extends any>(value: TValue | (() => TValue)) =>
  (typeof value === 'function' ? (value as any)() : value) as TValue;

var _$forward_ref_mark = '_$forward_ref' as const;

const TextInput = () => {
  var containerRef = null as unknown as HTMLElement;
  var inputRef = null as unknown as HTMLInputElement;

  return (
    <div
      ref={(el) => {
        containerRef = el;

        Object.defineProperty(containerRef, _$forward_ref_mark, {
          get() {
            return inputRef;
          },
        });
      }}
      data-is-component={true}
    >
      <input
        ref={(el) => {
          inputRef = el;
        }}
        type="text"
      />
    </div>
  );
};

const TextInputWithHelperText = (props: {
  children: JSX.Element;
  helperText: JSX.Element | (() => JSX.Element);
}) => {
  const resolvedChildren = children(
    () => props.children
  ) as unknown as () => HTMLElement;

  let isAdditionsApplied = false;

  createEffect(() => {
    const helperText = unwrapSignal(props.helperText as Element);

    if (helperText != null) {
      resolvedChildren().insertAdjacentElement('beforeend', helperText);
      // resolvedChildren().appendChild(helperText);
      // insert(resolvedChildren(), () => helperText);
    }

    onCleanup(() => {
      if (helperText != null) {
        console.log('cleanup', helperText);
        helperText.remove();
      }
    });
  });

  return resolvedChildren;
};

const TextInputWithLabel = (props: {
  children: JSX.Element;
  label: JSX.Element;
}) => {
  const resolvedChildren = children(
    () => props.children
  ) as unknown as () => HTMLElement;

  const forwardEl = () =>
    (resolvedChildren() as any)[_$forward_ref_mark] as HTMLElement;

  const forwardElId = forwardEl().id === '' ? createUniqueId() : forwardEl().id;

  resolvedChildren().setAttribute('id', forwardElId);

  createEffect(() => {
    const label = unwrapSignal(props.label as Element);
    label.setAttribute('for', forwardElId);

    if (label != null) {
      resolvedChildren().insertAdjacentElement('afterbegin', label);
    }

    onCleanup(() => {
      if (label != null) {
        label.remove();
      }
    });
  });

  return resolvedChildren;
};

const ElementAppend = () => {
  const [toggle, setToggle] = createSignal(true);

  return (
    <main>
      <div>
        <button
          type="button"
          onClick={() => {
            setToggle((prev) => !prev);
          }}
        >
          toggle
        </button>
        <div>toggle: {`${toggle()}`}</div>
      </div>

      <hr />

      <TextInputWithHelperText
        helperText={
          <Show when={toggle()}>
            <div>This is helper text!</div>
          </Show>
        }
      >
        <TextInputWithLabel label={<label>Text label</label>}>
          <TextInput />
        </TextInputWithLabel>
      </TextInputWithHelperText>

      <hr />

      <InputTest />
    </main>
  );
};

export default ElementAppend;

/*
  <InputContainer
    label={
      <label>Text label!</label>
    }
    helperText={
      <Show when={toggle()}>
        <div>This is helper text!</div>
      </Show>
    }
  >
    <TextInput />
  </InputContainer>
*/
