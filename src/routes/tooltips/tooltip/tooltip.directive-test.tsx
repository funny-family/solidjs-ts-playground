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

type EachChildrenListener = (args: {
  tooltip: HTMLElement;
  tooltipComputedStyle: CSSStyleDeclaration;
  tooltipStyle: CSSStyleDeclaration;
  tooltipPosition: TooltipPosition;
}) => void;

export var createDirective = function () {
  var eachChildrenListeners = new Array<EachChildrenListener>();

  const directive = function (
    this: any,
    element: TooltipDirectiveElementArg,
    accessor: TooltipDirectiveAccessorArg
  ) {
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

        tooltipStyle.setProperty(
          tooltipablePositionX_CssVar,
          `${tooltipableRectTop}px`
        );
        tooltipStyle.setProperty(
          tooltipablePositionY_CssVar,
          `${tooltipableRectLeft}px`
        );

        tooltipStyle.setProperty(
          tooltipableWidth_CssVar,
          `${tooltipableWidth}px`
        );
        tooltipStyle.setProperty(
          tooltipableHeight_CssVar,
          `${tooltipableHeight}px`
        );

        tooltipStyle.position = 'absolute';
        tooltipStyle.top = '0';
        tooltipStyle.left = '0';

        eachChildrenListeners.forEach((listener) => {
          listener({
            tooltip,
            tooltipComputedStyle,
            tooltipStyle,
            tooltipPosition,
          });
        });
      });
    });
  };

  directive.on = (type: 'each-children', listener: EachChildrenListener) => {
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
  return (directiveFunction: ReturnType<typeof createDirective>) => {
    directiveFunction.on(
      'each-children',
      ({ tooltipPosition, tooltipStyle }) => {
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
      }
    );

    return directiveFunction;
  };
};

export var withLogging = (
  element: TooltipDirectiveElementArg,
  accessor: TooltipDirectiveAccessorArg
) => {
  return (directiveFunction: ReturnType<typeof createDirective>) => {
    console.log('withLogging:', {
      element,
      accessor,
      accessor_f: accessor(),
      directiveFunction,
      id: element.id,
      on: directiveFunction,
    });

    directiveFunction.on('each-children', (args) => {
      console.log('withLogging "each-children":', args);
    });

    return directiveFunction;
  };
};

export var tooltip: TooltipDirectiveFunction = (element, accessor) => {
  // prettier-ignore
  const directive = (
    (
      withLogging(
        element,
        accessor
      )(
        (
          withPositions(
            element,
            accessor
          )(
            createDirective()
          )
        )
      )
    )
  );

  directive(element, accessor);
};

// export var tooltip: TooltipDirectiveFunction = (element, accessor) => {
//   withPositions(element, accessor)(createDirective, [])();
// };

// export var tooltip: TooltipDirectiveFunction = (element, accessor) => {
//   createDirective(element, accessor);
// };
