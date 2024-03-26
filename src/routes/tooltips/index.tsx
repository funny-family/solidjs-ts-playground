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

var tooltipOffsetX_CssVar = '--tooltip-offset-x' as const;
var tooltipOffsetY_CssVar = '--tooltip-offset-y' as const;
var tooltipPosition_CssVar = '--tooltip-position' as const;

var tooltip = (element: any, accessor: () => any) => {
  var container: HTMLDivElement = null as any;
  var resolvedChildren = children(() =>
    accessor()
  ) as WithResolvedChildren<TooltipDirectiveAccessorArg>;

  // var getTooltips = () => {
  //   return container.querySelectorAll('[data-is-tooltip="true"]');
  // };

  // createEffect(() => {
  //   // console.log(1, accessor());
  //   console.log(1, c());
  // });

  createEffect(() => {
    // ======================================================================
    <Portal
      ref={(el) => {
        container = el;
      }}
    >
      {resolvedChildren()}
    </Portal>;

    var tooltipableRect = element.getBoundingClientRect();
    var tooltipableRectTop = tooltipableRect.x + window.scrollY;
    var tooltipableRectLeft = tooltipableRect.y + window.scrollX;

    resolvedChildren.toArray().forEach((element) => {
      const elementComputedStyle = window.getComputedStyle(element);
      const tooltipPosition = (elementComputedStyle.getPropertyValue(
        tooltipPosition_CssVar
      ) || 'top-left-corner') as TooltipPosition;
      const elementStyle = element.style;

      elementStyle.position = 'absolute';
      elementStyle.top = '0';
      elementStyle.left = '0';

      if (tooltipPosition === 'top-left-corner') {
        element.style.transform = createTranslate3dStyle(
          `calc(-100% + ${tooltipableRectTop}px)`,
          `calc(-100% + ${tooltipableRectLeft}px)`
        );

        // tooltip.style.transform = createTranslate3dStyle(
        //   `calc(-100% + var(${tooltipMarginX_CssVar}))`,
        //   `calc(-100% - var(${tooltipMarginY_CssVar}))`
        // );
      }

      if (tooltipPosition === 'top-left') {
        // tooltip.style.transform = createTranslate3dStyle(
        //   `var(${tooltipMarginX_CssVar})`,
        //   `calc(-100% - var(${tooltipMarginY_CssVar}))`
        // );
      }

      if (tooltipPosition === 'top-center') {
        // tooltip.style.transform = createTranslate3dStyle(
        //   `calc(-50% + (var(${tooltipableWidth_CssVar}) / 2) + var(${tooltipMarginX_CssVar}))`,
        //   `calc(-100% - var(${tooltipMarginY_CssVar}))`
        // );
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

      console.log({
        tooltipableRect,
        element,
        tooltipPosition,
      });
    });

    // createEffect(() => {
    //   // insert(document.body, () => <>{option}</>);
    // });

    // element.setProperty('--tooltipable-width', tooltipableRect.width);
    // element.setProperty('--tooltipable-height', tooltipableRect.height);

    // element.setProperty(tooltip_marginBlock_CssVar, '0px');
    // element.setProperty(tooltip_marginInline_CssVar, '0px');

    // element.setProperty(
    //   '--tooltip_top-left-corner_translate_tx',
    //   `calc(-100% + var(${tooltip_marginBlock_CssVar}))`
    // );
    // element.setProperty(
    //   '--tooltip_top-left-corner_translate_ty',
    //   `calc(-100% - var(${tooltip_marginInline_CssVar}))`
    // );

    // element.setProperty(
    //   '--tooltip_top-left-corner_translate_tx',
    //   `calc(-100% + var(${tooltip_marginBlock_CssVar}))`
    // );
    // element.setProperty(
    //   '--tooltip_top-left-corner_translate_ty',
    //   `calc(-100% - var(${tooltip_marginInline_CssVar}))`
    // );
    // ======================================================================
  });

  onCleanup(() => {
    //
  });
};

const Tooltips = () => {
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
