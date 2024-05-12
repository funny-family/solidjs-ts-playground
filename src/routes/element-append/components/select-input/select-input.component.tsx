import { type JSX } from 'solid-js';
import styles from './select-input.module.css';
import inputStyles from '../../styles/input.module.css';

export const SelectInput = (attrsAndProps: JSX.IntrinsicElements['select']) => {
  return (
    <select
      {...attrsAndProps}
      class={`${attrsAndProps?.class || ''} ${styles.select} ${
        inputStyles.input
      }`}
      data-is-forward-element
    />
  );
};
