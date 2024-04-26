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
import type { TooltipType } from './tooltip.directive.types';

var ZERO_PIXELS = '0px' as const;
var TOOLTIP_DEFAULT_POSITION = 'top-left-corner' as const;

var tooltipPosition_CssVar = '--tooltip-position';
var tooltipOffsetX_CssVar = '--tooltip-offset-x';
var tooltipOffsetY_CssVar = '--tooltip-offset-y';
var tooltipablePositionX_CssVar = '--tooltipable-position-x';
var tooltipablePositionY_CssVar = '--tooltipable-position-y';
var tooltipableWidth_CssVar = '--tooltipable-width' as const;
var tooltipableHeight_CssVar = '--tooltipable-height' as const;

export var createDirective = (() => {
  var effectListeners = new Array<
    Extract<TooltipType.OnArgObject, { type: 'effect' }>['listener']
  >();

  var eachElementListeners = new Array<
    Extract<TooltipType.OnArgObject, { type: 'each-element' }>['listener']
  >();

  const directive = (
    element: TooltipType.ElementOption,
    accessor: TooltipType.AccessorOption
  ) => {
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

      effectListeners.forEach((listener) => {
        listener();
      });

      children.toArray().forEach((tooltip) => {
        const tooltipComputedStyle = window.getComputedStyle(tooltip);
        const tooltipStyle = tooltip.style;

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

        eachElementListeners.forEach((listener) => {
          listener({
            tooltip,
            style: tooltipStyle,
            computedStyle: tooltipComputedStyle,
          });
        });
      });
    });
  };

  // I gave up here ;)
  (directive as any).on = ((type, listener: any) => {
    if (type === 'effect') {
      effectListeners.push(listener);
    }

    if (type === 'each-element') {
      eachElementListeners.push(listener);
    }
  }) as TooltipType.DirectiveFunction_On;

  return directive;
  // And here as well ;)
}) as unknown as TooltipType.CreateDirectiveFunction;

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
        TOOLTIP_DEFAULT_POSITION)) as TooltipPosition;

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

export var withLogging = (
  element: TooltipDirectiveElementArg,
  accessor: TooltipDirectiveAccessorArg
) => {
  return (directiveFunction: ReturnType<typeof createDirective>) => {
    console.group('withLogging');
    console.log('element:', element);
    console.log('accessor:', accessor);

    directiveFunction.on('effect', () => {
      console.log('effect:');
    });

    directiveFunction.on('each-element', (args) => {
      console.log('each-element:', args);
    });
    console.groupEnd();

    return directiveFunction;
  };
};

// =================================================================

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

// export var tooltip: TooltipType.DirectiveFunction = (element, accessor) => {
//   const directive = createDirective();

//   directive(element, accessor);
// };
