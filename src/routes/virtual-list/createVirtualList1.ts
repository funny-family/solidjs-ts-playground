import { Accessor, createSignal } from 'solid-js';

/**
 * T or a reactive/non-reactive function returning T
 */
export type MaybeAccessor<T> = T | Accessor<T>;

/**
 * Accessed value of a MaybeAccessor
 * @example
 * ```ts
 * MaybeAccessorValue<MaybeAccessor<string>>
 * // => string
 * MaybeAccessorValue<MaybeAccessor<() => string>>
 * // => string | (() => string)
 * MaybeAccessorValue<MaybeAccessor<string> | Function>
 * // => string | void
 * ```
 */
export type MaybeAccessorValue<T extends MaybeAccessor<any>> =
  T extends () => any ? ReturnType<T> : T;

type VirtualListConfig<T extends readonly any[]> = {
  items: T;
  rootHeight: number;
  rowHeight: number;
  overscanCount?: number;
};

/**
 * Accesses the value of a MaybeAccessor
 * @example
 * ```ts
 * access("foo") // => "foo"
 * access(() => "foo") // => "foo"
 * ```
 */
export const access = <T extends MaybeAccessor<any>>(
  v: T
): MaybeAccessorValue<T> => (typeof v === 'function' && !v.length ? v() : v);

type VirtualListReturn<T extends readonly any[]> = [
  Accessor<{
    containerHeight: number;
    viewerTop: number;
    visibleItems: T;
  }>,
  (e: Event) => void
];

/**
 * A headless virtualized list (see https://www.patterns.dev/vanilla/virtual-lists/) utility for constructing your own virtualized list components with maximum flexibility.
 *
 * @param items the list of items
 * @param rootHeight the height of the root element of the virtualizedList
 * @param rowHeight the height of individual rows in the virtualizedList
 * @param overscanCount the number of elements to render both before and after the visible section of the list, so passing 5 will render 5 items before the list, and 5 items after. Defaults to 1, cannot be set to zero. This is necessary to hide the blank space around list items when scrolling
 * @returns {VirtualListReturn} to use in the list's jsx
 */
export function createVirtualList<T extends readonly any[]>({
  items,
  rootHeight,
  rowHeight,
  overscanCount,
}: VirtualListConfig<T>): VirtualListReturn<T> {
  // items = access(items) || ([] as any as T);
  // rootHeight = access(rootHeight);
  // rowHeight = access(rowHeight);
  // overscanCount = access(overscanCount) || 1;
  overscanCount ||= 1;

  const [offset, setOffset] = createSignal(0);

  const getFirstIdx = () =>
    Math.max(0, Math.floor(offset() / rowHeight) - overscanCount);

  const getLastIdx = () =>
    Math.min(
      items.length,
      Math.floor(offset() / rowHeight) +
        Math.ceil(rootHeight / rowHeight) +
        overscanCount
    );

  return [
    () => ({
      containerHeight: items.length * rowHeight,
      viewerTop: getFirstIdx() * rowHeight,
      visibleItems: items.slice(getFirstIdx(), getLastIdx()) as unknown as T,
    }),
    (e) => {
      // @ts-expect-error
      if (e.target?.scrollTop !== undefined) setOffset(e.target.scrollTop);
    },
  ];
}
