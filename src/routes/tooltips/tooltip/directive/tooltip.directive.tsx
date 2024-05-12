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
import {
  withPositions,
  defaultPositionsMap,
} from './decorators/with-positions.decorator';
import {
  TOOLTIP_DEFAULT_POSITION,
  ZERO_PIXELS,
  eachElementTypeListenerName,
  effectTypeListenerName,
  tooltipOffsetX_CssVar,
  tooltipOffsetY_CssVar,
  tooltipableHeight_CssVar,
  tooltipablePositionX_CssVar,
  tooltipablePositionY_CssVar,
  tooltipableWidth_CssVar,
} from './constants';

export var createDirective: TooltipType.CreateDirectiveFunction = () => {
  var effectListeners = new Array<
    Extract<
      TooltipType.OnArgObject,
      { type: typeof effectTypeListenerName }
    >['listener']
  >();

  var eachElementListeners = new Array<
    Extract<
      TooltipType.OnArgObject,
      { type: typeof eachElementTypeListenerName }
    >['listener']
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

      effectListeners.forEach((listener) => {
        listener();
      });

      // console.log(111, children.toArray(), children());

      children.toArray().forEach((tooltip) => {
        const tooltipableRect = element.getBoundingClientRect();
        const tooltipableWidth = tooltipableRect.width;
        const tooltipableHeight = tooltipableRect.height;
        const tooltipablePositionX = tooltipableRect.left + window.scrollX;
        const tooltipablePositionY = tooltipableRect.top + window.scrollY;

        const tooltipComputedStyle = window.getComputedStyle(tooltip);
        const tooltipStyle = tooltip.style;

        tooltipComputedStyle.getPropertyValue(tooltipOffsetX_CssVar) ||
          tooltipStyle.setProperty(tooltipOffsetX_CssVar, ZERO_PIXELS);

        tooltipComputedStyle.getPropertyValue(tooltipOffsetY_CssVar) ||
          tooltipStyle.setProperty(tooltipOffsetY_CssVar, ZERO_PIXELS);

        tooltipStyle.setProperty(
          tooltipablePositionX_CssVar,
          `${tooltipablePositionX}px`
        );
        tooltipStyle.setProperty(
          tooltipablePositionY_CssVar,
          `${tooltipablePositionY}px`
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
            tooltipStyle,
            tooltipComputedStyle,
          });
        });
      });
    });
  };

  directive.on = (type, listener) => {
    if (type === effectTypeListenerName) {
      effectListeners.push(listener);
    }

    if (type === eachElementTypeListenerName) {
      eachElementListeners.push(listener);
    }
  };

  return directive;
};

// =================================================================

// export var tooltip: TooltipType.DirectiveFunction = (element, accessor) => {
//   const directive = createDirective();

//   console.log({ tooltipDirective: directive });

//   // prettier-ignore
//   const setup = (
//     (
//       withLogging(
//         element,
//         accessor
//       )(
//         (
//           withPositions(
//             element,
//             accessor
//           )(
//             directive,
//             defaultPositionsMap,
//             TOOLTIP_DEFAULT_POSITION
//           )
//         )
//       )
//     )
//   );

//   setup(element, accessor);
// };

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
          directive
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
