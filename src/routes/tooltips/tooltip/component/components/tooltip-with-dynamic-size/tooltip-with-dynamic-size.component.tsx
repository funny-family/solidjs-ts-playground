import {
  createEffect,
  createUniqueId,
  onCleanup,
  children as toChildren,
} from 'solid-js';
import type { TooltipWithDynamicSizeComponent } from './tooltip-with-dynamic-size.component.types';

var transitionEndListenersMap = new Map<
  string,
  (event: DocumentEventMap['transitionend']) => any
>();

window.transitionEndListenersMap = transitionEndListenersMap;

document.addEventListener(
  'transitionend',
  (event) => {
    transitionEndListenersMap.forEach((listener) => {
      listener(event);
    });
  },
  true
);

export var TooltipWithDynamicSize: TooltipWithDynamicSizeComponent = (
  props
) => {
  var children = toChildren(() => {
    return props.children;
  }) as unknown as () => HTMLElement;

  console.log('created!');

  var uniqueId = createUniqueId();

  const onTransitionEnd = (event: TransitionEvent) => {
    const target = event.target as HTMLElement;
    const bodyRect = document.body.getBoundingClientRect();
    const bodyRectWidth = bodyRect.width;
    const elementRect = target.getBoundingClientRect();
    const elementRectLeft = elementRect.left;

    // // prettier-ignore
    // const availableMaxWidth = (
    //   ((elementRectLeft + elementRect.width) > bodyRectWidth) ?
    //     (bodyRectWidth - elementRectLeft) :
    //       0
    // );

    // prettier-ignore
    const availableMaxWidth = elementRect.width - ((elementRect.left + elementRect.width) - bodyRect.width);

    console.log({ uniqueId, availableMaxWidth, target, bodyRect, elementRect });

    // availableMaxWidth && (target.style.maxWidth = `${availableMaxWidth}px`);
  };

  transitionEndListenersMap.set(uniqueId, onTransitionEnd);

  // children().ontransitionend = (event) => {
  //   console.log(event);
  // };

  onCleanup(() => {
    transitionEndListenersMap.delete(uniqueId);
  });

  return children;
};
