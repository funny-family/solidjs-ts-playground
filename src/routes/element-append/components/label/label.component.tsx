import { type JSX } from 'solid-js';
import styles from './label.module.css';

export const Label = (props: JSX.IntrinsicElements['label']) => {
  return <label {...props} class={`${props?.class || ''} ${styles.label}`} />;
};
