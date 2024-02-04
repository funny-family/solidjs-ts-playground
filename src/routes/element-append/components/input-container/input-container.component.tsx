import { type JSX, splitProps } from 'solid-js';
import styles from './input-container.module.css';
import inputStyles from '../../styles/input.module.css';

export const dataIsInputContainerAttrName = 'data-is-input-container' as const;
export const dataIsInputInnerContainerAttrName =
  'data-is-input-inner-container' as const;
export const dataIsForwardElementAttrName = 'data-is-forward-element' as const;

export const InputContainer = (attrsAndProps: JSX.IntrinsicElements['div']) => {
  const [children, resetAttrs] = splitProps(attrsAndProps, ['children']);

  return (
    <div
      {...resetAttrs}
      class={`${resetAttrs?.class || ''} ${styles.inputContainer}`}
      data-is-input-container
    >
      <div
        class={`${styles.innerContainer} ${inputStyles.inputInnerContainer}`}
        data-is-input-inner-container
      >
        {children.children}
      </div>
    </div>
  );
};
