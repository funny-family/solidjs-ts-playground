import {
  TOOLTIP_DEFAULT_POSITION,
  eachElementTypeListenerName,
  tooltipOffsetX_CssVar,
  tooltipOffsetY_CssVar,
  tooltipPosition_CssVar,
  tooltipableHeight_CssVar,
  tooltipablePositionX_CssVar,
  tooltipablePositionY_CssVar,
  tooltipableWidth_CssVar,
} from '../constants';
import type { TooltipType } from '../tooltip.directive.types';
import { createTranslate3dStyle } from '../utils';

export var defaultPositionsMap = new Map<string, string>([
  [
    'top-left-corner',
    createTranslate3dStyle(
      `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'top-left',
    createTranslate3dStyle(
      `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'top-center',
    createTranslate3dStyle(
      `calc((var(${tooltipablePositionX_CssVar}) + (-50% + var(${tooltipableWidth_CssVar}) / 2)) + var(${tooltipOffsetX_CssVar}))`,
      `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'top-right',
    createTranslate3dStyle(
      `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'top-right-corner',
    createTranslate3dStyle(
      `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'right-top',
    createTranslate3dStyle(
      `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'right-center',
    createTranslate3dStyle(
      `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(-50% + var(${tooltipablePositionY_CssVar}) + (var(${tooltipableHeight_CssVar}) / 2) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'right-bottom',
    createTranslate3dStyle(
      `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(-100% + var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'bottom-right-corner',
    createTranslate3dStyle(
      `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'bottom-right',
    createTranslate3dStyle(
      `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'bottom-center',
    createTranslate3dStyle(
      `calc((var(${tooltipablePositionX_CssVar}) + (-50% + var(${tooltipableWidth_CssVar}) / 2)) + var(${tooltipOffsetX_CssVar}))`,
      `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'bottom-left',
    createTranslate3dStyle(
      `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'bottom-left-corner',
    createTranslate3dStyle(
      `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'left-bottom',
    createTranslate3dStyle(
      `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(-100% + var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'left-center',
    createTranslate3dStyle(
      `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(-50% + var(${tooltipablePositionY_CssVar}) + (var(${tooltipableHeight_CssVar}) / 2) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
  [
    'left-top',
    createTranslate3dStyle(
      `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
      `calc(var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
    ),
  ],
]);

export var withPositions: TooltipType.DirectiveFunctionDecorator<
  [positionsMap: Map<string, string>, defaultPosition: string]
> = (element, accessor) => {
  return (directiveFunction, positionsMap, defaultPosition) => {
    directiveFunction.on(eachElementTypeListenerName, (args) => {
      // prettier-ignore
      var position = (
        args.tooltipComputedStyle.getPropertyValue(tooltipPosition_CssVar) ||
        defaultPosition !== '' && (
          args.tooltipStyle.setProperty(
            tooltipPosition_CssVar,
            defaultPosition
          ),
          defaultPosition
        ) || ''
      );

      args.tooltipStyle.transform = positionsMap.get(position) || '';
    });

    return directiveFunction;
  };
};
