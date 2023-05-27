import { createSignal } from 'solid-js';
import { createGlobalState } from '~/utils/create-global-state.util';

export const useNames = createGlobalState(() => {
  const { 0: name, 1: setName } = createSignal('Bob');

  const changeNameToSally = () => {
    setName('Sally');
  };

  const changeNameToMax = () => {
    setName('Max');
  };

  return {
    name,
    changeNameToSally,
    changeNameToMax,
  } as const;
});
