import { type JSX, children, createEffect, onCleanup } from 'solid-js';
import { unwrapSignal } from '~/utils';
import styles from './input-with-helper-text.module.css';

export const InputWithHelperText = (props: {
  children: JSX.Element;
  helperText: JSX.Element | (() => JSX.Element);
}) => {
  const resolvedChildren = children(
    () => props.children
  ) as unknown as () => Element;

  createEffect(() => {
    const helperText = unwrapSignal(props.helperText) as
      | HTMLElement
      | undefined;

    if (helperText != null) {
      helperText.classList.add(styles.helperTextSlot);

      resolvedChildren().insertAdjacentElement('beforeend', helperText);
    }

    onCleanup(() => {
      if (helperText != null) {
        helperText.remove();
      }
    });
  });

  return resolvedChildren as unknown as JSX.Element;
};
