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
import { tooltip } from './tooltip/directive/tooltip.directive';
import { TooltipType } from './tooltip/directive/tooltip.directive.types';

declare module 'solid-js' {
  namespace JSX {
    interface Directives extends TooltipType.DirectiveObject {}
  }
}

const Tooltips = () => {
  tooltip;

  var [isTooltipVisible, setTooltipVisibility] = createSignal(false);

  return (
    <main style={{ 'margin-inline': '2em' }}>
      <section>
        <h1
        // use:test={1}
        >
          What is Lorem Ipsum?
        </h1>
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
              setTooltipVisibility(false);
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
