import {
  TOOLTIP_DEFAULT_POSITION,
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

export var withPositions: TooltipType.DirectiveFunctionDecorator = (
  element,
  accessor
) => {
  return (directiveFunction) => {
    directiveFunction.on('each-element', (args) => {
      const tooltipPosition = (args.computedStyle.getPropertyValue(
        tooltipPosition_CssVar
      ) ||
        (args.style.setProperty(
          tooltipPosition_CssVar,
          TOOLTIP_DEFAULT_POSITION
        ),
        TOOLTIP_DEFAULT_POSITION)) as TooltipType.DefaultPosition;

      if (tooltipPosition === 'top-left-corner') {
        args.style.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'top-left') {
        args.style.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'top-center') {
        args.style.transform = createTranslate3dStyle(
          `calc((var(${tooltipablePositionX_CssVar}) + (-50% + var(${tooltipableWidth_CssVar}) / 2)) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'top-right') {
        args.style.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'top-right-corner') {
        args.style.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'right-top') {
        args.style.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'right-center') {
        args.style.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-50% + var(${tooltipablePositionY_CssVar}) + (var(${tooltipableHeight_CssVar}) / 2) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'right-bottom') {
        args.style.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'bottom-right-corner') {
        args.style.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'bottom-right') {
        args.style.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'bottom-center') {
        args.style.transform = createTranslate3dStyle(
          `calc((var(${tooltipablePositionX_CssVar}) + (-50% + var(${tooltipableWidth_CssVar}) / 2)) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'bottom-left') {
        args.style.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'bottom-left-corner') {
        args.style.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'left-bottom') {
        args.style.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'left-center') {
        args.style.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-50% + var(${tooltipablePositionY_CssVar}) + (var(${tooltipableHeight_CssVar}) / 2) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'left-top') {
        args.style.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }
    });

    return directiveFunction;
  };
};
