import { getOwner, runWithOwner, onError } from 'solid-js';

/**
 * @see https://vueuse.org/shared/createGlobalState/
 */
export const createSharedStore = <Fn extends (...args: any[]) => any>(
  storeFactory: Fn
) => {
  let initialized = false;
  let state: any = undefined;
  const owner = getOwner();

  return ((...args: any[]) => {
    if (!initialized) {
      runWithOwner(owner, () => storeFactory(...args));
      initialized = true;
    }

    return state;
  }) as Fn;
};
