import {
  createEffect,
  createRenderEffect,
  on,
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

  createEffect(() => {
    // console.group('RenderEffect:');
    // console.log('children: ', children());
    // console.log(
    //   'isElementOverflowingBody: ',
    //   isElementOverflowingBody(children() as HTMLElement)
    // );
    // console.log('body rect:', document.body.getBoundingClientRect());
    // console.log('element rect:', (children() as any).getBoundingClientRect());
    // console.groupEnd();

    console.log({ c: children(), r: children().getBoundingClientRect() });

    // setTimeout(() => {
    //   //
    // }, 50);
  });

  // createEffect(
  //   on(children, (element) => {
  //     console.log(123132131, element, element.getBoundingClientRect());
  //   })
  // );

  return children;
};
