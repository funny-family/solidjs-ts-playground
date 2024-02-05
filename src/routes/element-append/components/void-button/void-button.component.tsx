import { type JSX } from 'solid-js';
import styles from './void-button.module.css';

export const VoidButton = (attrsAndProps: JSX.IntrinsicElements['button']) => {
  return (
    <button
      {...attrsAndProps}
      class={`${attrsAndProps?.class || ''} ${styles.voidButton}`}
      type={attrsAndProps?.type || 'button'}
    />
  );
};
