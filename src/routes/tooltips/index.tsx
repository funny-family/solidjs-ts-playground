import {
  For,
  Show,
  children,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js';
import { Portal, insert } from 'solid-js/web';
import './tooltip.css';
import { Transition, TransitionGroup } from 'solid-transition-group';
import { Tooltip } from './tooltip/tooltip.component';
import {
  TooltipDirectiveAccessorArg,
  TooltipPosition,
  WithResolvedChildren,
} from './types';
import { createTranslate3dStyle } from './utils';

var ZERO_PIXELS = '0px' as const;
var TOOLTIP_DEFAULT_POSITION = 'top-left-corner' as const;

var tooltipPosition_CssVar = '--tooltip-position';
var tooltipOffsetX_CssVar = '--tooltip-offset-x';
var tooltipOffsetY_CssVar = '--tooltip-offset-y';
var tooltipablePositionX_CssVar = '--tooltipable-position-x';
var tooltipablePositionY_CssVar = '--tooltipable-position-y';
var tooltipableWidth_CssVar = '--tooltipable-width' as const;
var tooltipableHeight_CssVar = '--tooltipable-height' as const;

var tooltip = (element: HTMLElement, accessor: () => any) => {
  var resolvedChildren = children(() =>
    accessor()
  ) as WithResolvedChildren<TooltipDirectiveAccessorArg>;

  createEffect(() => {
    // ======================================================================
    <Portal>{resolvedChildren()}</Portal>;

    var tooltipableRect = element.getBoundingClientRect();
    var tooltipableWidth = tooltipableRect.width;
    var tooltipableHeight = tooltipableRect.height;
    var tooltipableRectTop = tooltipableRect.x + window.scrollY;
    var tooltipableRectLeft = tooltipableRect.y + window.scrollX;

    resolvedChildren.toArray().forEach((tooltip) => {
      const tooltipComputedStyle = window.getComputedStyle(tooltip);
      const tooltipStyle = tooltip.style;

      const tooltipPosition =
        tooltipComputedStyle.getPropertyValue(tooltipPosition_CssVar) ||
        (tooltipStyle.setProperty(
          tooltipPosition_CssVar,
          TOOLTIP_DEFAULT_POSITION
        ),
        TOOLTIP_DEFAULT_POSITION);

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
        // tooltip.style.transform = createTranslate3dStyle(
        //   `calc(-100% + var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
        //   `calc(-100% - var(${tooltipMarginY_CssVar}))`
        // );
      }

      if (tooltipPosition === 'top-right-corner') {
        // tooltip.style.transform = createTranslate3dStyle(
        //   `calc(var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
        //   `calc(-100% - var(${tooltipMarginY_CssVar}))`
        // );
      }

      if (tooltipPosition === 'right-top') {
        // tooltip.style.transform = createTranslate3dStyle(
        //   `calc(var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
        //   `calc(-1 * var(${tooltipMarginY_CssVar}))`
        // );
      }

      if (tooltipPosition === 'right-center') {
        // tooltip.style.transform = createTranslate3dStyle(
        //   `calc(var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
        //   `calc(-50% + (var(${tooltipableHeight_CssVar}) / 2) - var(${tooltipMarginY_CssVar}))`
        // );
      }

      if (tooltipPosition === 'right-bottom') {
        // tooltip.style.transform = createTranslate3dStyle(
        //   `calc(var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
        //   `calc((var(${tooltipableHeight_CssVar}) - 100%) - var(${tooltipMarginY_CssVar}))`
        // );
      }

      if (tooltipPosition === 'bottom-right-corner') {
        // tooltip.style.transform = createTranslate3dStyle(
        //   `calc(var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
        //   `calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`
        // );
      }

      if (tooltipPosition === 'bottom-right') {
        // tooltip.style.transform = createTranslate3dStyle(
        //   `calc(-100% + var(${tooltipableWidth_CssVar}) + var(${tooltipMarginX_CssVar}))`,
        //   `calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`
        // );
      }

      if (tooltipPosition === 'bottom-center') {
        // tooltip.style.transform = createTranslate3dStyle(
        //   `calc(-50% + (var(${tooltipableWidth_CssVar}) / 2) + var(${tooltipMarginX_CssVar}))`,
        //   `calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`
        // );
      }

      if (tooltipPosition === 'bottom-left') {
        // tooltip.style.transform = createTranslate3dStyle(
        //   `var(${tooltipMarginX_CssVar})`,
        //   `calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`
        // );
      }

      if (tooltipPosition === 'bottom-left-corner') {
        // tooltip.style.transform = createTranslate3dStyle(
        //   `calc(-100% + var(${tooltipMarginX_CssVar}))`,
        //   `calc(var(${tooltipableHeight_CssVar}) - var(${tooltipMarginY_CssVar}))`
        // );
      }

      if (tooltipPosition === 'left-bottom') {
        // tooltip.style.transform = createTranslate3dStyle(
        //   `calc(-100% + var(${tooltipMarginX_CssVar}))`,
        //   `calc((var(${tooltipableHeight_CssVar}) - 100%) - var(${tooltipMarginY_CssVar}))`
        // );
        // }
        // if (position === 'left-center') {
        //   tooltip.style.transform = createTranslate3dStyle(
        //     `calc(-100% + var(${tooltipMarginX_CssVar}))`,
        //     `calc(-50% + (var(${tooltipableHeight_CssVar}) / 2) - var(${tooltipMarginY_CssVar}))`
        //   );
      }

      if (tooltipPosition === 'left-top') {
        // tooltip.style.transform = createTranslate3dStyle(
        //   `calc(-100% + var(${tooltipMarginX_CssVar}))`,
        //   `calc(-1 * var(${tooltipMarginY_CssVar}))`
        // );
      }
    });
    // ======================================================================
  });
};

const Tooltips = () => {
  tooltip;

  var [isTooltipVisible, setTooltipVisibility] = createSignal(false);

  return (
    <main style={{ 'margin-inline': '2em' }}>
      <section>
        <h1>What is Lorem Ipsum?</h1>
        <p>
          <b>Lorem Ipsum</b> is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the{' '}
          <b
            style={{ border: '1px solid blue' }}
            tabIndex={0}
            onMouseEnter={() => {
              setTooltipVisibility(true);
            }}
            onMouseLeave={() => {
              // setTooltipVisibility(false);
            }}
            // use:tooltip={
            //   <Show when={isTooltipVisible()}>
            //     <Tooltip
            //       class="custom-tooltip custom-tooltip_top-center"
            //       data-is-tooltip={false}
            //     >
            //       just tooltip!
            //     </Tooltip>
            //   </Show>
            // }

            use:tooltip={
              <Transition name="slide-fade">
                <Show when={isTooltipVisible()}>
                  <Tooltip
                    class="custom-tooltip custom-tooltip_top-center"
                    data-is-tooltip={false}
                  >
                    just tooltip!
                  </Tooltip>
                </Show>
              </Transition>
            }

            // use:tooltip={[
            //   <Show when={isTooltipVisible()}>
            //     <Tooltip
            //       class="custom-tooltip custom-tooltip_top-center"
            //       data-is-tooltip={false}
            //     >
            //       just tooltip!
            //     </Tooltip>
            //   </Show>,
            //   <Transition name="slide-fade">
            //     <Show when={isTooltipVisible()}>
            //       <Tooltip class="custom-tooltip custom-tooltip_top-right-corner">
            //         slide fade tooltip
            //       </Tooltip>
            //     </Show>
            //   </Transition>,
            // ]}

            // use:tooltips={
            //   <TransitionGroup name="slide-fade">
            //     <Show when={isTooltipVisible()}>
            //       <For
            //         each={[
            //           <Tooltip>just tooltip!</Tooltip>,
            //           <Tooltip>slide fade tooltip</Tooltip>,
            //         ]}
            //       >
            //         {(el) => {
            //           return el;
            //         }}
            //       </For>
            //     </Show>
            //   </TransitionGroup>
            // }
          >
            1960s
          </b>{' '}
          with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
      </section>
    </main>
  );
};

export default Tooltips;
