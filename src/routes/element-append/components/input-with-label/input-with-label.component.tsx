import {
  type JSX,
  children,
  createEffect,
  onCleanup,
  createUniqueId,
} from 'solid-js';
import { unwrapSignal } from '~/utils';
import styles from './input-with-label.module.css';

export const InputWithLabel = (props: {
  children: JSX.Element;
  label: JSX.Element | (() => JSX.Element);
}) => {
  const resolvedChildren = children(
    () => props.children
  ) as unknown as () => Element;

  const forwardElement = (() => {
    const element = resolvedChildren().querySelector(
      '[data-is-forward-element]'
    );

    if (element == null) {
      throw new Error('"data-is-forward-element" attribute is required!');
    }

    return element;
  })();

  const forwardElementId =
    forwardElement.id === '' ? createUniqueId() : forwardElement.id;

  forwardElement.id = forwardElementId;

  createEffect(() => {
    const label = unwrapSignal(props.label) as HTMLLabelElement | undefined;

    if (label != null) {
      label.classList.add(styles.labelSlot);
      label.htmlFor === '' && (label.htmlFor = forwardElementId);

      resolvedChildren().insertAdjacentElement('afterbegin', label);
    }

    onCleanup(() => {
      if (label != null) {
        label.remove();
      }
    });
  });

  return resolvedChildren as JSX.Element;
};
