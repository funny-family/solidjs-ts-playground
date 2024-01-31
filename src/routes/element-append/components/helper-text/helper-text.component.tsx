import { type JSX } from 'solid-js';
import styles from './helper-text.module.css';

export const HelperText = (props: JSX.IntrinsicElements['div']) => {
  return (
    <div {...props} class={`${props?.class || ''} ${styles.helperText}`} />
  );
};
