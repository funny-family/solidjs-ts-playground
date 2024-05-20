import type { TooltipType } from './tooltip.directive.types';

export var ZERO_PIXELS = '0px' as const;

export var tooltipPosition_CssVar = '--tooltip-position';
export var tooltipOffsetX_CssVar = '--tooltip-offset-x';
export var tooltipOffsetY_CssVar = '--tooltip-offset-y';
export var tooltipablePositionX_CssVar = '--tooltipable-position-x';
export var tooltipablePositionY_CssVar = '--tooltipable-position-y';
export var tooltipableWidth_CssVar = '--tooltipable-width' as const;
export var tooltipableHeight_CssVar = '--tooltipable-height' as const;

export var effectTypeListenerName: TooltipType.OnArgType_Effect = 'effect';
export var eachElementTypeListenerName: TooltipType.OnArgType_EachElement =
  'each-element';
