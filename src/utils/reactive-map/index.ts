import { batch } from 'solid-js';
import { TriggerCache } from '../trigger-cache';

const $KEYS = Symbol('track-keys');

/**
 * @see https://github.com/solidjs-community/solid-primitives/blob/main/packages/map/src/index.ts
 */
export class ReactiveMap<K, V> extends Map<K, V> {
  #keyTriggers = new TriggerCache<K | typeof $KEYS>();
  #valueTriggers = new TriggerCache<K>();

  constructor(initial?: Iterable<readonly [K, V]> | null) {
    super();
    if (initial) for (const v of initial) super.set(v[0], v[1]);
  }

  // reads
  has(key: K): boolean {
    this.#keyTriggers.track(key);
    return super.has(key);
  }
  get(key: K): V | undefined {
    this.#valueTriggers.track(key);

    return super.get(key);
  }
  get size(): number {
    this.#keyTriggers.track($KEYS);

    return super.size;
  }

  *keys(): IterableIterator<K> {
    for (const key of super.keys()) {
      this.#keyTriggers.track(key);

      yield key;
    }

    this.#keyTriggers.track($KEYS);
  }
  *values(): IterableIterator<V> {
    for (const [key, v] of super.entries()) {
      this.#valueTriggers.track(key);

      yield v;
    }

    this.#keyTriggers.track($KEYS);
  }
  *entries(): IterableIterator<[K, V]> {
    for (const entry of super.entries()) {
      this.#valueTriggers.track(entry[0]);

      yield entry;
    }

    this.#keyTriggers.track($KEYS);
  }

  // writes
  set(key: K, value: V): this {
    batch(() => {
      if (super.has(key)) {
        if (super.get(key)! === value) {
          return;
        }
      } else {
        this.#keyTriggers.dirty(key);
        this.#keyTriggers.dirty($KEYS);
      }

      this.#valueTriggers.dirty(key);
      super.set(key, value);
    });
    return this;
  }
  delete(key: K): boolean {
    const isDeleted = super.delete(key);

    if (isDeleted) {
      batch(() => {
        this.#keyTriggers.dirty(key);
        this.#keyTriggers.dirty($KEYS);
        this.#valueTriggers.dirty(key);
      });
    }

    return isDeleted;
  }
  clear(): void {
    if (super.size) {
      batch(() => {
        for (const v of super.keys()) {
          this.#keyTriggers.dirty(v);
          this.#valueTriggers.dirty(v);
        }

        super.clear();
        this.#keyTriggers.dirty($KEYS);
      });
    }
  }

  // callback
  forEach(callbackfn: (value: V, key: K, map: this) => void) {
    this.#keyTriggers.track($KEYS);

    for (const [key, v] of super.entries()) {
      this.#valueTriggers.track(key);

      callbackfn(v, key, this);
    }
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }
}
