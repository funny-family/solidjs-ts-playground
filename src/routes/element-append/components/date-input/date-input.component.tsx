import { type JSX } from 'solid-js';
import styles from './date-input.module.css';
import inputStyles from '../../styles/input.module.css';

export const DateInput = (
  attrsAndProps: Omit<JSX.IntrinsicElements['input'], 'children' | 'type'>
) => {
  return (
    <input
      {...attrsAndProps}
      type="date"
      class={`${attrsAndProps?.class || ''} ${styles.dateInput} ${
        inputStyles.input
      }`}
      data-is-forward-element
    />
  );
};
