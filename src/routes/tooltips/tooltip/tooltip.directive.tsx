import { Portal } from 'solid-js/web';
import { children as toChildren, createEffect } from 'solid-js';
import type {
  TooltipDirectiveAccessorArg,
  TooltipDirectiveFunction,
  TooltipPosition,
  WithResolvedChildren,
} from '../types';
import { createTranslate3dStyle } from '../utils';

var ZERO_PIXELS = '0px' as const;
var TOOLTIP_DEFAULT_POSITION = 'top-left-corner' as const;

var tooltipPosition_CssVar = '--tooltip-position';
var tooltipOffsetX_CssVar = '--tooltip-offset-x';
var tooltipOffsetY_CssVar = '--tooltip-offset-y';
var tooltipablePositionX_CssVar = '--tooltipable-position-x';
var tooltipablePositionY_CssVar = '--tooltipable-position-y';
var tooltipableWidth_CssVar = '--tooltipable-width' as const;
var tooltipableHeight_CssVar = '--tooltipable-height' as const;

var directive: TooltipDirectiveFunction = function (element, accessor) {
  var children = toChildren(() =>
    accessor()
  ) as WithResolvedChildren<TooltipDirectiveAccessorArg>;

  createEffect(() => {
    <Portal>{children()}</Portal>;

    var tooltipableRect = element.getBoundingClientRect();
    var tooltipableWidth = tooltipableRect.width;
    var tooltipableHeight = tooltipableRect.height;
    var tooltipableRectTop = tooltipableRect.x + window.scrollY;
    var tooltipableRectLeft = tooltipableRect.y + window.scrollX;

    children.toArray().forEach((tooltip) => {
      const tooltipComputedStyle = window.getComputedStyle(tooltip);
      const tooltipStyle = tooltip.style;

      // prettier-ignore
      const tooltipPosition = (
        tooltipComputedStyle.getPropertyValue(tooltipPosition_CssVar) || (
            tooltipStyle.setProperty(
              tooltipPosition_CssVar,
              TOOLTIP_DEFAULT_POSITION
            ),
            TOOLTIP_DEFAULT_POSITION
          )
      ) as TooltipPosition

      // prettier-ignore
      tooltipComputedStyle.getPropertyValue(tooltipOffsetX_CssVar) || (
        tooltipStyle.setProperty(
          tooltipOffsetX_CssVar,
          ZERO_PIXELS
        ),
        ZERO_PIXELS
      );

      // prettier-ignore
      tooltipComputedStyle.getPropertyValue(tooltipOffsetY_CssVar) || (
        tooltipStyle.setProperty(
          tooltipOffsetY_CssVar,
          ZERO_PIXELS
        ),
        ZERO_PIXELS
      );

      tooltip.style.setProperty(
        tooltipablePositionX_CssVar,
        `${tooltipableRectTop}px`
      );
      tooltip.style.setProperty(
        tooltipablePositionY_CssVar,
        `${tooltipableRectLeft}px`
      );

      tooltip.style.setProperty(
        tooltipableWidth_CssVar,
        `${tooltipableWidth}px`
      );
      tooltip.style.setProperty(
        tooltipableHeight_CssVar,
        `${tooltipableHeight}px`
      );

      tooltipStyle.position = 'absolute';
      tooltipStyle.top = '0';
      tooltipStyle.left = '0';

      if (tooltipPosition === 'top-left-corner') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'top-left') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'top-center') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc((var(${tooltipablePositionX_CssVar}) + (-50% + var(${tooltipableWidth_CssVar}) / 2)) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'top-right') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'top-right-corner') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'right-top') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'right-center') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-50% + var(${tooltipablePositionY_CssVar}) + (var(${tooltipableHeight_CssVar}) / 2) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'right-bottom') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'bottom-right-corner') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'bottom-right') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipableWidth_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'bottom-center') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc((var(${tooltipablePositionX_CssVar}) + (-50% + var(${tooltipableWidth_CssVar}) / 2)) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'bottom-left') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'bottom-left-corner') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'left-bottom') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-100% + var(${tooltipablePositionY_CssVar}) + var(${tooltipableHeight_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'left-center') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(-50% + var(${tooltipablePositionY_CssVar}) + (var(${tooltipableHeight_CssVar}) / 2) - var(${tooltipOffsetY_CssVar}))`
        );
      }

      if (tooltipPosition === 'left-top') {
        tooltipStyle.transform = createTranslate3dStyle(
          `calc(-100% + var(${tooltipablePositionX_CssVar}) + var(${tooltipOffsetX_CssVar}))`,
          `calc(var(${tooltipablePositionY_CssVar}) - var(${tooltipOffsetY_CssVar}))`
        );
      }
    });
  });
};

export var withPositions = function (
  directive: TooltipDirectiveFunction,
  positions: any
) {
  console.log({ directive, positions });

  return directive;
};

export var createDirective = () => {
  return directive;
};

/*
  import { createDirective, withPositions, positions } form 'solid-js-tooltip';
  ...
  const tooltip = createDirective();
  ...
  const tooltip = withPositions(
    createDirective(),
    // some positions..
  );
*/
