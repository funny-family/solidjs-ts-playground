// ------------------------------------------ Spread ------------------------------------------
type OptionalPropertyNames<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never;
}[keyof T];

type SpreadProperties<L, R, K extends keyof L & keyof R> = {
  [P in K]: L[P] | Exclude<R[P], undefined>;
};

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

type SpreadTwo<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

export type Spread<A extends readonly [...any]> = A extends [
  infer L,
  ...infer R
]
  ? SpreadTwo<L, Spread<R>>
  : unknown;
// ------------------------------------------ Spread ------------------------------------------

export type PickKeyOf<
  TRecord extends Record<string, any>,
  TKeys extends keyof TRecord
> = keyof Pick<TRecord, TKeys>;

// ------------------------------------------ "Type safe" Map ------------------------------------------
/**
 * @see https://www.typescriptlang.org/play/?ssl=21&ssc=41&pln=1&pc=1#code/C4TwDgpgBAogdsATgSwgZygXigbQIZwgA0UBIAugFDIISIBmeAxtACISRwAmECAsnjAAeGFAgAPYLy4Z4SVGgB8UAN6UoUegHtEMZgAsAFEzwAbUwCNmAa3pwAXFCEBpMZOmycABnKLD6jSgANzMAVwhHGElEZmAREhxnEjJfHABGchJrCBBHJKgAW0FHdk4efkERRQCASixlIK1kLhJgfWQ0AEFEAHMAfkcyGsdG5oBuAJ6IONcJKW5PHz9s3KhnYdho2PjcfJTFdPIoAB8oUO4IehoILgmNNGmXN3mZWG9fQxW8khDTcMitkw4jAEntCKkMhs2h07lBEBA8FwtHBTCAoGhkAAvCJQOChAoWOiwnAAZRABK0pgAdMgpDFgDpyIYNgBJOl4CymCBsuh4BmIKqw3jydDMxw8mKc7ns-mCgIrNBiqASjlclWymDvRSw37hRWs9lS9U6ESHbUBeGI5Go3BkinUhkk+RwHoAFTwPXIjjQzp6EwAvpRqLQGMw2BxpMKBGAAMLIn2IUJAnSqAJwCAAdycojmHlgCBQ6D8AQ0wsLaEiOCoGg2pUjFWEMHNGnTWZEzzzcnLflrEYuDblGktSJRaLAiC0DNAkBKffKwGjQjI5sDlCY8eAUDr-YXgiwUGjpAw2-n0bjcATSf5EzXG6gK06jgAYucgchkfvmfVVFBA+uL5uKwAEKOCopCOHiBJ0L++5gXgjhpAATAAzL+Qb-j6hR7tgrZbnOUaVDgL5wG+yIkJBhKIEcpw4HBEH4pRv4kBYWiUgicC+EGRRgFSDzAJ8OSdCQSHIXUAD0YlQFo1iUNxvHTAJIBAa0iYQOJknSehd7wbiDHQac5w8Fc6ZcPuclTPxD41LeAFQBYjgsWxBAnGcFzGTcZmCFSFmKUB1myV5fGKUJUBIOE1lyUFwHCSh1lAA
 */
type MapEntries = [any, any];
type KeyToValue<K, E extends MapEntries> = E extends [infer EK, infer EV]
  ? K extends EK
    ? EV
    : never
  : never;

export interface DependentMap<E extends MapEntries> {
  forEach(
    callbackfn: <K extends E[0]>(
      value: KeyToValue<K, E>,
      key: K,
      map: DependentMap<E>
    ) => void,
    thisArg?: any
  ): void;
  get<K extends E[0]>(key: K): KeyToValue<K, E> | undefined;
  set<K extends E[0]>(key: K, value: KeyToValue<K, E>): this;
  readonly size: number;
  [Symbol.iterator](): IterableIterator<E>;
  entries(): IterableIterator<E>;
  keys(): IterableIterator<E[0]>;
  values(): IterableIterator<E[1]>;
  readonly [Symbol.toStringTag]: string;
}

export interface DependentMapConstructor {
  new <E extends MapEntries>(entries: E[]): DependentMap<E>;
  new <E extends MapEntries>(): DependentMap<E>;
  readonly prototype: DependentMap<any>;
}
// ------------------------------------------ "Type safe" Map ------------------------------------------

export type Entry<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

export type Entries<T> = Entry<T>[];
