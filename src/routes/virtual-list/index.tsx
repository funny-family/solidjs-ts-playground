import { For, Show } from 'solid-js';
import { createVirtualList } from './createVirtualList1';

export default () => {
  var rootHeight = 400;
  const items = Array(10_000)
    .fill(0)
    .map((_, i) => {
      return i + 1;
    });

  const [virtual, onScroll] = createVirtualList({
    // the list of items - can be a signal
    items,
    // the height of the root element of the virtualizedList - can be a signal
    rootHeight,
    // the height of individual rows in the virtualizedList - can be a signal
    rowHeight: 20,
    // the number of elements to render both before and after the visible section of the list, so passing 5 will render 5 items before the list, and 5 items after. Defaults to 1, cannot be set to zero. This is necessary to hide the blank space around list items when scrolling - can be a signal
    overscanCount: 5,
  });

  return (
    <div>
      <div
        style={{
          overflow: 'auto',
          // root element's height must be rootHeight
          height: `${rootHeight}px`,
        }}
        // outermost container must use onScroll
        onScroll={onScroll}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            // list container element's height must be set to containerHeight()
            height: `${virtual().containerHeight}px`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              // viewer element's top must be set to viewerTop()
              top: `${virtual().viewerTop}px`,
            }}
          >
            {/* only visibleItems() are ultimately rendered */}
            <For fallback={'no items'} each={virtual().visibleItems}>
              {(item) => <div>{item}</div>}
            </For>
          </div>
        </div>
      </div>

      <hr />

      {/* <For fallback={null} each={items}>
        {(item) => <div>{item}</div>}
      </For> */}
    </div>
  );
};
