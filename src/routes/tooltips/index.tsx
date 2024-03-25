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

var tooltip_marginBlock_CssVar = '--tooltip_margin-block' as const;
var tooltip_marginInline_CssVar = '--tooltip_margin-inline' as const;
var tooltipPosition_CssVar = '--tooltip-position' as const;

var tooltip = (element: any, accessor: () => any) => {
  var container: HTMLDivElement = null as any;
  var resolvedChildren = children(() => accessor());

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
    var tooltipableRectTop = tooltipableRect.top + window.scrollY;
    var tooltipableRectLeft = tooltipableRect.left + window.scrollX;

    (resolvedChildren.toArray() as HTMLElement[]).forEach((element) => {
      const elementComputedStyle = window.getComputedStyle(element);
      const tooltipPosition = elementComputedStyle.getPropertyValue(
        tooltipPosition_CssVar
      );

      element.style.position = 'absolute';
      element.style.top = '0';
      element.style.left = '0';
      element.style.translate = `calc(-50% / 2) -100%`;

      console.log(
        `translate3d(${tooltipableRectTop}px, ${tooltipableRectLeft}px, 0px,)`
      );

      console.log({
        tooltipableRectTop,
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
    <main>
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
