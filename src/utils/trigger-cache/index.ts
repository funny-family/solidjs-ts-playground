import {
  type SignalOptions,
  createSignal,
  getListener,
  onCleanup,
  DEV,
} from 'solid-js';
import { isServer } from 'solid-js/web';

const triggerOptions: SignalOptions<any> =
  !isServer && DEV ? { equals: false, name: 'trigger' } : { equals: false };
const triggerCacheOptions: SignalOptions<any> =
  !isServer && DEV ? { equals: false, internal: true } : triggerOptions;

/**
 * @see https://github.com/solidjs-community/solid-primitives/blob/main/packages/trigger/src/index.ts
 */
export class TriggerCache<T> {
  #map: Map<
    T,
    {
      // track
      $(): void;
      // dirty
      $$(): void;
      // n of listeners
      n: number;
    }
  >;

  constructor(mapConstructor: WeakMapConstructor | MapConstructor = Map) {
    this.#map = new (mapConstructor as MapConstructor)();
  }

  dirty(key: T) {
    if (isServer) return;
    this.#map.get(key)?.$$();
  }

  track(key: T) {
    if (!getListener()) return;
    let trigger = this.#map.get(key);
    if (!trigger) {
      const [$, $$] = createSignal(undefined, triggerCacheOptions);
      this.#map.set(key, (trigger = { $, $$, n: 1 }));
    } else trigger.n++;
    onCleanup(() => {
      // remove the trigger when no one is listening to it
      if (trigger!.n-- === 1)
        // microtask is to avoid removing the trigger used by a single listener
        queueMicrotask(() => trigger!.n === 0 && this.#map.delete(key));
    });
    trigger.$();
  }
}
