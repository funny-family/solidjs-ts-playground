import { createSignal } from 'solid-js';

type VirtualListConfig<T extends readonly any[]> = {
  items: T;
  rootHeight: number;
  rowHeight: number;
  overScanCount?: number;
};

type VirtualListReturn<T extends readonly any[]> = {
  containerHeight: number;
  viewerTop: number;
  visibleItems: T;
  onScroll: <TEvent extends UIEvent>(event: TEvent) => void;
};

/**
 * A headless virtualized list (see https://www.patterns.dev/vanilla/virtual-lists/) utility for constructing your own virtualized list components with maximum flexibility.
 *
 * @param items the list of items
 * @param rootHeight the height of the root element of the virtualizedList
 * @param rowHeight the height of individual rows in the virtualizedList
 * @param overScanCount the number of elements to render both before and after the visible section of the list, so passing 5 will render 5 items before the list, and 5 items after. Defaults to 1, cannot be set to zero. This is necessary to hide the blank space around list items when scrolling
 * @returns {VirtualListReturn} to use in the list's jsx
 */
export function createVirtualList<T extends readonly any[]>({
  items,
  rootHeight,
  rowHeight,
  overScanCount,
}: VirtualListConfig<T>): VirtualListReturn<T> {
  items ||= new Array() as any;
  // rootHeight = rootHeight;
  // rowHeight = rowHeight;
  overScanCount ||= 1;

  var { 0: offset, 1: setOffset } = createSignal(0);

  const construct_getFirstIdx =
    (offset: () => number, rowHeight: number, overScanCount: number) => () => {
      return Math.max(0, Math.floor(offset() / rowHeight) - overScanCount);
    };
  const getFirstIdx = construct_getFirstIdx(offset, rowHeight, overScanCount);

  const construct_getLastIdx =
    (
      items: T,
      offset: () => number,
      rowHeight: number,
      overScanCount: number
    ) =>
    () => {
      return Math.min(
        items.length,
        Math.floor(offset() / rowHeight) +
          Math.ceil(rootHeight / rowHeight) +
          overScanCount
      );
    };
  const getLastIdx = construct_getLastIdx(
    items,
    offset,
    rowHeight,
    overScanCount
  );

  const containerHeight = items.length * rowHeight;
  const viewerTop = getFirstIdx() * rowHeight;
  const visibleItems = items.toSpliced(
    getFirstIdx(),
    getLastIdx()
  ) as unknown as T;
  const onScroll: VirtualListReturn<T>['onScroll'] = (event) => {
    const target = event.target as HTMLElement | undefined;

    target?.scrollTop != null && setOffset(target.scrollTop);
  };

  return {
    containerHeight,
    viewerTop,
    visibleItems,
    onScroll,
  };
}
