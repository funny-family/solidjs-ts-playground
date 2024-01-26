import { type JSX } from 'solid-js';
import styles from './text-input.module.css';

export const TextInput = (props: JSX.IntrinsicElements['input']) => {
  return (
    <input
      {...props}
      type={props?.type || 'text'}
      class={`${props?.class || ''} ${styles.textInput}`}
    />
  );
};
