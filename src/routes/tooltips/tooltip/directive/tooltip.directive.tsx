import { Portal } from 'solid-js/web';
import { children as toChildren, createEffect } from 'solid-js';
import type {
  TooltipDirectiveAccessorArg,
  TooltipDirectiveElementArg,
  TooltipDirectiveFunction,
  TooltipPosition,
  WithResolvedChildren,
} from '../../types';
import { createTranslate3dStyle } from '../../utils';
import type {
  ResolvedChildrenOf,
  TooltipType,
} from './tooltip.directive.types';
import { withLogging } from './decorators/with-logging.decorator';
import { withPositions } from './decorators/with-positions.decorator';
import {
  ZERO_PIXELS,
  tooltipOffsetX_CssVar,
  tooltipOffsetY_CssVar,
  tooltipableHeight_CssVar,
  tooltipablePositionX_CssVar,
  tooltipablePositionY_CssVar,
  tooltipableWidth_CssVar,
} from './constants';

export var createDirective: TooltipType.CreateDirectiveFunction = () => {
  var effectListeners = new Array<
    Extract<TooltipType.OnArgObject, { type: 'effect' }>['listener']
  >();

  var eachElementListeners = new Array<
    Extract<TooltipType.OnArgObject, { type: 'each-element' }>['listener']
  >();

  const directive: TooltipType.DirectiveFunctionWithAdditions = (
    element,
    accessor
  ) => {
    var children = toChildren(() => {
      return accessor();
    }) as ResolvedChildrenOf<TooltipType.AccessorOption>;

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

  directive.on = (type, listener) => {
    if (type === 'effect') {
      effectListeners.push(listener);
    }

    if (type === 'each-element') {
      eachElementListeners.push(listener);
    }
  };

  return directive;
};

// =================================================================

export var tooltip: TooltipType.DirectiveFunction = (element, accessor) => {
  const directive = createDirective();

  console.log({ tooltipDirective: directive });

  // prettier-ignore
  const setup = (
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
            directive
          )
        )
      )
    )
  );

  setup(element, accessor);
};

// export var tooltip: TooltipType.DirectiveFunction = (element, accessor) => {
//   const directive = createDirective();

//   directive(element, accessor);
// };
