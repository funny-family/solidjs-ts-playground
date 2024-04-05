import { Portal } from 'solid-js/web';
import { children as toChildren, createEffect } from 'solid-js';
import type {
  TooltipDirectiveAccessorArg,
  TooltipDirectiveElementArg,
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

type TooltipDirectiveObject = {
  element: TooltipDirectiveElementArg;
  accessor: TooltipDirectiveAccessorArg;
  directive: TooltipDirectiveFunction;
};

export var createDirective = function (
  this: any,
  element: TooltipDirectiveElementArg,
  accessor: TooltipDirectiveAccessorArg
) {
  var eachChildrenListeners = new Array<Function>();

  const directive = function () {
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

        const tooltipPosition = (tooltipComputedStyle.getPropertyValue(
          tooltipPosition_CssVar
        ) ||
          (tooltipStyle.setProperty(
            tooltipPosition_CssVar,
            TOOLTIP_DEFAULT_POSITION
          ),
          TOOLTIP_DEFAULT_POSITION)) as TooltipPosition;

        tooltipComputedStyle.getPropertyValue(tooltipOffsetX_CssVar) ||
          (tooltipStyle.setProperty(tooltipOffsetX_CssVar, ZERO_PIXELS),
          ZERO_PIXELS);

        tooltipComputedStyle.getPropertyValue(tooltipOffsetY_CssVar) ||
          (tooltipStyle.setProperty(tooltipOffsetY_CssVar, ZERO_PIXELS),
          ZERO_PIXELS);

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

        eachChildrenListeners.forEach((listener) => {
          listener();
        });

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

  directive.on = (type: string, listener: Function) => {
    if (type === 'each-children') {
      eachChildrenListeners.push(listener);
    }
  };

  return directive;
};

export var withPositions = (
  element: TooltipDirectiveElementArg,
  accessor: TooltipDirectiveAccessorArg
) => {
  return (directiveFunction: typeof createDirective, positions: any) => {
    const directive = directiveFunction(element, accessor);

    directive.on('each-children', () => {
      console.log(1);
    });

    console.log('withPositions:', {
      args: {
        element,
        accessor: accessor(),
      },
      directive,
      directiveFunction,
      positions,
    });

    // return directiveFunction;

    return directiveFunction;

    // directiveFunction.apply(null, [
    //   element,
    //   accessor,
    // ]) as unknown as TooltipDirectiveFunction;
  };
};

export var withLogging = (
  element: TooltipDirectiveElementArg,
  accessor: TooltipDirectiveAccessorArg
) => {
  return (directiveFunction: typeof createDirective) => {
    const directive = directiveFunction(element, accessor);

    directive.on('each-children', () => {
      console.group('withLogging:');
      console.log('element:', element);
      console.log('accessor:', accessor);
      console.log('directiveFunction:', directiveFunction);
      console.log('directive:', directive);
      console.groupEnd();
    });

    return directiveFunction;
  };
};

export var tooltip: TooltipDirectiveFunction = (element, accessor) => {
  const d = createDirective;

  // withLogging(
  //   element,
  //   accessor
  // )(withPositions(element, accessor)(createDirective, []))();
};

// export var tooltip: TooltipDirectiveFunction = (element, accessor) => {
//   withPositions(element, accessor)(createDirective, [])();
// };

// export var tooltip: TooltipDirectiveFunction = (element, accessor) => {
//   createDirective(element, accessor);
// };
