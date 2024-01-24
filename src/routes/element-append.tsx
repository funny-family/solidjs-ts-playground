import {
  Show,
  children,
  createEffect,
  createSignal,
  onCleanup,
} from 'solid-js';
import { insert } from 'solid-js/web';

// https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement#visualization_of_position_names

var unwrapElement = (element: HTMLElement | (() => HTMLElement)) =>
  typeof element === 'function' ? element() : element;

const TextInput = () => {
  return (
    <div data-is-component={true}>
      <input type="text" />
    </div>
  );
};

const TextInputWithHelperText = (props) => {
  const resolvedChildren = children(
    () => props.children
  ) as unknown as () => HTMLElement;

  createEffect(() => {
    const helperText = unwrapElement(props.helperText);

    if (helperText != null) {
      console.log('on effect', helperText);
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

  return resolvedChildren();
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
        <TextInput />
      </TextInputWithHelperText>
    </main>
  );
};

export default ElementAppend;
