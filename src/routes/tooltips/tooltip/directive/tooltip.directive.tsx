import { Portal } from 'solid-js/web';
import {
  children as toChildren,
  createEffect,
  onCleanup,
  createSignal,
  createRenderEffect,
} from 'solid-js';
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
    var tooltipsContainerRef: HTMLDivElement = null as any;

    var children = toChildren(() => {
      return accessor();
    }) as ResolvedChildrenOf<TooltipType.AccessorOption>;

    createEffect(() => {
      const bodyRect = document.body.getBoundingClientRect();

      tooltipsContainerRef.style.position = 'absolute';
      tooltipsContainerRef.style.inset = '0px';
      tooltipsContainerRef.style.width = `${bodyRect.width}px`;
      tooltipsContainerRef.style.height = `${bodyRect.height}px`;
      tooltipsContainerRef.style.pointerEvents = 'none';
      tooltipsContainerRef.style.zIndex = '0';
      tooltipsContainerRef.style.overflow = 'hidden';

      effectListeners.forEach((listener) => {
        listener();
      });

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

        eachElementListeners.forEach((listener) => {
          listener({
            tooltip,
            tooltipStyle,
            tooltipComputedStyle,
          });
        });
      });
    });

    <Portal ref={tooltipsContainerRef}>{children()}</Portal>;
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
//           directive
//         )
//       )
//     )
//   );

//   setup(element, accessor);
// };

export var tooltip: TooltipType.DirectiveFunction = (element, accessor) => {
  const directive = createDirective();

  directive(element, accessor);
};
