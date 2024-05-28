import {
  createEffect,
  createRenderEffect,
  on,
  onCleanup,
  onMount,
  children as toChildren,
} from 'solid-js';
import type { TooltipWithDynamicSizeComponent } from './tooltip-with-dynamic-size.component.types';
import { ResolvedChildrenOf } from '../../../directive/tooltip.directive.types';

var isOverflowing = <T extends HTMLElement>(element: T) => {
  return (
    element.scrollHeight !==
    Math.max(element.offsetHeight, element.clientHeight)
  );
};

var isElementOverflowingBody = <T extends HTMLElement>(element: T) => {
  var bodyElementRect = document.body.getBoundingClientRect();
  var elementRect = element.getBoundingClientRect();

  return (
    elementRect.top < bodyElementRect.top ||
    elementRect.right > bodyElementRect.right ||
    elementRect.bottom > bodyElementRect.bottom ||
    elementRect.left < bodyElementRect.left
  );
};

export var TooltipWithDynamicSize: TooltipWithDynamicSizeComponent = (
  props
) => {
  var children = toChildren(() => {
    return props.children;
  }) as unknown as () => HTMLElement;

  var onTransitionEnd = (event: TransitionEvent) => {
    console.group('"transitionend"');
    console.log('event:', event);
    console.log('target:', event.target);
    console.log(
      'elementRect:',
      (event.target as Element).getBoundingClientRect()
    );
    console.groupEnd();
  };

  // children().addEventListener('transitionend', onTransitionEnd);

  console.log(1231231, children());

  return children;
};
