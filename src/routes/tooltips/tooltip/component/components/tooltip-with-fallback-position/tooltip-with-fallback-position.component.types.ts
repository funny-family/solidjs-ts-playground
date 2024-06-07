import type { Component, JSX } from 'solid-js';

export type TooltipWithFallbackPositionAttrs = {
  children: JSX.Element;
};

export type TooltipWithFallbackPositionProps = {
  classes?: string[];
};

export type TooltipWithFallbackPositionAttrsAndProps =
  TooltipWithFallbackPositionAttrs & TooltipWithFallbackPositionProps;

export type TooltipWithFallbackPositionComponent =
  Component<TooltipWithFallbackPositionAttrsAndProps>;
