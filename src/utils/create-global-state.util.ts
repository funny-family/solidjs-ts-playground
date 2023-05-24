import { getOwner, runWithOwner } from 'solid-js';

type AnyFunction = (...args: any[]) => any;

/**
 * @see https://vueuse.org/shared/createGlobalState/
 */
export const createGlobalState = <StoreFactory extends AnyFunction>(
  storeFactory: StoreFactory
) => {
  let initialized = false;
  let state: any = undefined;
  const owner = getOwner();

  return ((...args: any[]) => {
    if (!initialized) {
      state = runWithOwner(owner, () => storeFactory.apply(undefined, args));
      initialized = true;
    }

    return state;
  }) as StoreFactory;
};
