import { type JSX, children, createEffect, onCleanup } from 'solid-js';
import styles from './input-with-reset-button.module.css';
import {
  dataIsForwardElementAttrName,
  dataIsInputInnerContainerAttrName,
} from '../input-container/input-container.component';

export const InputWithResetButton = (props: {
  children: JSX.Element;
  resetButton: JSX.Element | (() => JSX.Element);
}) => {
  const resolvedChildren = children(
    () => props.children
  ) as unknown as () => Element;

  const inputInnerContainer = (() => {
    const element = resolvedChildren().querySelector(
      `[${dataIsInputInnerContainerAttrName}]`
    );

    if (element == null) {
      throw new Error('"data-is-input-inner-container" attribute is required!');
    }

    return element;
  })();

  // const forwardElement = (() => {
  //   const element = resolvedChildren().querySelector(
  //     `[${dataIsForwardElementAttrName}]`
  //   );

  //   if (element == null) {
  //     throw new Error(
  //       `"${dataIsForwardElementAttrName}" attribute is required!`
  //     );
  //   }

  //   return element;
  // })();

  // const onClick = (event: MouseEvent): any => {
  //   console.log(event);
  //   console.log(forwardElement);
  // };

  createEffect(() => {
    const resetButton = (
      typeof props.resetButton === 'function'
        ? props.resetButton()
        : props.resetButton
    ) as HTMLButtonElement;

    if (resetButton != null) {
      resetButton.classList.add(styles.resetButtonSlot);
      // resetButton.addEventListener('click', onClick);

      inputInnerContainer.insertAdjacentElement('beforeend', resetButton);
    }

    onCleanup(() => {
      if (resetButton != null) {
        resetButton.remove();
        // resetButton.removeEventListener('click', onClick);
      }
    });
  });

  return resolvedChildren as JSX.Element;
};
