import { type JSX } from 'solid-js';
import styles from './select-input.module.css';

export const SelectInput = (attrsAndProps: JSX.IntrinsicElements['select']) => {
  return (
    <select
      {...attrsAndProps}
      class={`${attrsAndProps?.class || ''} ${styles.select}`}
      data-is-forward-element
    />
  );
};
