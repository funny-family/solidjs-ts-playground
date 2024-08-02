import { batch } from 'solid-js';
import { TriggerCache } from './trigger-cache';

export var $KEYS = Symbol('track-keys');

/**
 * A reactive version of `Map` data structure. All the reads (like `get` or `has`) are signals, and all the writes (`delete` or `set`) will cause updates to appropriate signals.
 * @param initial initial entries of the reactive map
 * @param equals signal equals function, determining if a change should cause an update
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/map#ReactiveMap
 * @example
 * const userPoints = new ReactiveMap<User, number>();
 * createEffect(() => {
 *    userPoints.get(user1) // => T: number | undefined (reactive)
 *    userPoints.has(user1) // => T: boolean (reactive)
 *    userPoints.size // => T: number (reactive)
 * });
 * // apply changes
 * userPoints.set(user1, 100);
 * userPoints.delete(user2);
 * userPoints.set(user1, { foo: "bar" });
 */
export class ReactiveMap<K, V> extends Map<K, V> {
  keyTriggers = new TriggerCache<K | typeof $KEYS>();
  valueTriggers = new TriggerCache<K>();

  constructor(initial?: Iterable<readonly [K, V]> | null) {
    super();

    if (initial) for (const v of initial) super.set(v[0], v[1]);
  }

  // reads
  has(key: K, trigger?: boolean): boolean {
    if (trigger == null) {
      trigger = true;
    }

    if (trigger) {
      this.keyTriggers.track(key);
    }

    return super.has(key);
  }

  get(key: K): V | undefined {
    this.valueTriggers.track(key);

    return super.get(key);
  }

  get size(): number {
    this.keyTriggers.track($KEYS);

    return super.size;
  }

  *keys(): IterableIterator<K> {
    for (const key of super.keys()) {
      this.keyTriggers.track(key);

      yield key;
    }

    this.keyTriggers.track($KEYS);
  }

  *values(): IterableIterator<V> {
    for (const [key, v] of super.entries()) {
      this.valueTriggers.track(key);

      yield v;
    }

    this.keyTriggers.track($KEYS);
  }

  *entries(): IterableIterator<[K, V]> {
    for (const entry of super.entries()) {
      this.valueTriggers.track(entry[0]);

      yield entry;
    }

    this.keyTriggers.track($KEYS);
  }

  // writes
  set(key: K, value: V): this {
    batch(() => {
      if (super.has(key)) {
        if (super.get(key)! === value) {
          return;
        }
      } else {
        this.keyTriggers.dirty(key);
        this.keyTriggers.dirty($KEYS);
      }

      this.valueTriggers.dirty(key);
      super.set(key, value);
    });

    return this;
  }

  delete(key: K, trigger?: boolean): boolean {
    if (trigger == null) {
      trigger = true;
    }

    var r = super.delete(key);

    if (r && trigger) {
      batch(() => {
        this.keyTriggers.dirty(key);
        this.keyTriggers.dirty($KEYS);
        this.valueTriggers.dirty(key);
      });
    }

    return r;
  }

  clear(): void {
    if (super.size) {
      batch(() => {
        for (const v of super.keys()) {
          this.keyTriggers.dirty(v);
          this.valueTriggers.dirty(v);
        }

        super.clear();
        this.keyTriggers.dirty($KEYS);
      });
    }
  }

  // callback
  forEach(callbackfn: (value: V, key: K, map: this) => void) {
    this.keyTriggers.track($KEYS);

    for (const { 0: key, 1: v } of super.entries()) {
      this.valueTriggers.track(key);

      callbackfn(v, key, this);
    }
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }
}
