import {
  For,
  Show,
  children,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js';
import './tooltip.css';
import { Transition, TransitionGroup } from 'solid-transition-group';
import { Tooltip } from './tooltip/component/tooltip.component';
import { tooltip } from './tooltip/directive/tooltip.directive';
import { TooltipType } from './tooltip/directive/tooltip.directive.types';
import './tooltip/positions.scss';
import { TooltipWithDynamicSize } from './tooltip/component/components/tooltip-with-dynamic-size/tooltip-with-dynamic-size.component';
import { TooltipWithFallbackPosition } from './tooltip/component/components/tooltip-with-fallback-position/tooltip-with-fallback-position.component';

declare module 'solid-js' {
  namespace JSX {
    interface Directives extends TooltipType.DirectiveObject {}
  }
}

var Tooltips = () => {
  tooltip;

  var [isTooltipVisible, setTooltipVisibility] = createSignal(false);

  var [isSectionVisible, setSectionVisibility] = createSignal(true);

  onMount(() => {
    window.scrollTo(0, 100);
  });

  return (
    <main style={{ 'margin-inline': '2em' }}>
      <button
        type="button"
        onClick={() => {
          setSectionVisibility((value) => {
            return !value;
          });
        }}
      >
        )))))
      </button>

      <Show when={isSectionVisible()}>
        <section>
          <h1
          // use:test={1}
          >
            What is Lorem Ipsum?
          </h1>
          <p>
            <b>Lorem Ipsum</b> is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
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
              //     <TooltipWithDynamicSize>
              //       <Tooltip
              //         class="custom-tooltip solid-js-tooltip_default-position solid-js-tooltip-position__top-center"
              //         data-is-tooltip={false}
              //       >
              //         just tooltip!
              //       </Tooltip>
              //     </TooltipWithDynamicSize>
              //   </Show>
              // }

              // use:tooltip={
              //   <Transition name="slide-fade">
              //     <Show when={isTooltipVisible()}>
              //       <Tooltip
              //         class="custom-tooltip solid-js-tooltip_default-position solid-js-tooltip-position__top-center"
              //         // class="custom-tooltip"
              //         data-is-tooltip={false}
              //       >
              //         just tooltip!
              //       </Tooltip>
              //     </Show>
              //   </Transition>
              // }

              // use:tooltip={
              //   <>
              //     <Show when={isTooltipVisible()}>
              //       <Tooltip
              //         id="sjnf67___1"
              //         class="custom-tooltip"
              //         data-is-tooltip={false}
              //       >
              //         just tooltip!
              //       </Tooltip>
              //     </Show>
              //     <Transition name="slide-fade">
              //       <Show when={isTooltipVisible()}>
              //         <Tooltip id="sjnf67___2" class="custom-tooltip">
              //           slide fade tooltip
              //         </Tooltip>
              //       </Show>
              //     </Transition>
              //   </>
              // }

              use:tooltip={
                <TransitionGroup name="slide-fade">
                  <Show when={isTooltipVisible()}>
                    <For
                      each={[
                        <Tooltip
                          class="custom-tooltip solid-js-tooltip_default-position solid-js-tooltip-position__top-center"
                          data-has-transition-class={false}
                        >
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Illum, ipsa!
                        </Tooltip>,

                        // <TooltipWithDynamicSize>
                        //   <Tooltip
                        //     class="custom-tooltip solid-js-tooltip_default-position solid-js-tooltip-position__top-center"
                        //     data-has-transition-class={false}
                        //   >
                        //     Lorem ipsum dolor, sit amet consectetur adipisicing
                        //     elit. Illum, ipsa!
                        //   </Tooltip>
                        // </TooltipWithDynamicSize>,

                        // <TooltipWithDynamicSize>
                        //   <Tooltip
                        //     style={{ width: '300px' }}
                        //     class="custom-tooltip solid-js-tooltip_default-position solid-js-tooltip-position__bottom-right-corner"
                        //     data-has-transition-class={false}
                        //   >
                        //     Lorem ipsum dolor, sit amet consectetur adipisicing
                        //     elit. Maxime, facilis.
                        //   </Tooltip>
                        // </TooltipWithDynamicSize>,

                        <TooltipWithFallbackPosition
                          classes={[
                            '1',
                            'solid-js-tooltip-position__bottom-center',
                            '2',
                            'solid-js-tooltip-position__left-center',
                            '3',
                          ]}
                        >
                          <Tooltip
                            style={{ width: '300px' }}
                            class="custom-tooltip solid-js-tooltip_default-position solid-js-tooltip-position__bottom-right-corner"
                            data-has-transition-class={false}
                          >
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Maxime, facilis.
                          </Tooltip>
                        </TooltipWithFallbackPosition>,

                        // <Tooltip
                        //   style={{ width: '300px' }}
                        //   class="custom-tooltip solid-js-tooltip_default-position solid-js-tooltip-position__bottom-right-corner"
                        //   data-has-transition-class={false}
                        // >
                        //   Lorem ipsum dolor, sit amet consectetur adipisicing
                        //   elit. Maxime, facilis.
                        // </Tooltip>,
                      ]}
                    >
                      {(el) => {
                        return el;
                      }}
                    </For>
                  </Show>
                </TransitionGroup>
              }
            >
              1960s
            </b>{' '}
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </section>
      </Show>
      {Array(80)
        .fill(1)
        .map((n) => {
          return <div>{n}</div>;
        })}
    </main>
  );
};

export default Tooltips;
