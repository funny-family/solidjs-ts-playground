import { type JSX } from 'solid-js';
import styles from './text-input.module.css';
import inputStyles from '../../styles/input.module.css';

export const TextInput = (props: JSX.IntrinsicElements['input']) => {
  return (
    <input
      {...props}
      type={props?.type || 'text'}
      class={`${props?.class || ''} ${styles.textInput} ${inputStyles.input}`}
      data-is-forward-element
    />
  );
};
