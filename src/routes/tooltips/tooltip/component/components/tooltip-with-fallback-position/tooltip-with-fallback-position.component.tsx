import { children as toChildren } from 'solid-js';
import type { TooltipWithFallbackPositionComponent } from './tooltip-with-fallback-position.component.types';

export var isElementOverflowing = <T extends HTMLElement>(
  element: T
): boolean => {
  return false;
};

export var TooltipWithFallbackPosition: TooltipWithFallbackPositionComponent = (
  attrsAndProps
) => {
  var children = toChildren(() => {
    return attrsAndProps.children;
  }) as unknown as () => HTMLElement;

  return children;
};
