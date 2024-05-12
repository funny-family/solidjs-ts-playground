import type { ChildrenReturn, JSX } from 'solid-js';

export type TooltipPosition =
  | 'top-left-corner'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'top-right-corner'
  | 'right-top'
  | 'right-center'
  | 'right-bottom'
  | 'bottom-right-corner'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-left-corner'
  | 'left-bottom'
  | 'left-center'
  | 'left-top';

export type WithResolvedChildren<TRecord extends any> = TRecord & {
  toArray: () => HTMLElement[];
};

export type TooltipDirectiveElementArg = HTMLElement;

export type TooltipDirectiveAccessorArg = () => HTMLElement | HTMLElement[];

export type TooltipDirectiveFunction = (
  element: TooltipDirectiveElementArg,
  accessor: TooltipDirectiveAccessorArg
) => void;

export type TooltipDirective = () => void;
