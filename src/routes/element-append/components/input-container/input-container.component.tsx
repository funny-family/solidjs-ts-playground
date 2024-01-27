import { type JSX } from 'solid-js';
import styles from './input-container.module.css';

export const InputContainer = (props: JSX.IntrinsicElements['div']) => {
  return (
    <div {...props} class={`${props?.class || ''} ${styles.inputContainer}`} />
  );
};
