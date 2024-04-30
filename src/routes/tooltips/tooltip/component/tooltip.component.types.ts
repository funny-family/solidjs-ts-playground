import type { Component, JSX } from 'solid-js';
import { DataAttribute } from '~/@types';

export type TooltipAttrs = JSX.IntrinsicElements['div'] &
  DataAttribute & {
    /**
     * @description
     * Data attribute that notifies the screen reader user that this element has a tooltip.
     */
    ['data-tooltip-sr-notification']?: string;
  };

export type TooltipProps = {};

export type TooltipAttrsAndProps = TooltipAttrs & TooltipProps;

export type TooltipComponent = Component<TooltipAttrsAndProps>;
