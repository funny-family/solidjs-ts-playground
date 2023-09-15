import { splitProps, mergeProps, Show, Accessor } from 'solid-js';
import type { Component, JSX } from 'solid-js';
import type {
  EventHandlerUnionTuple,
  HTMLElementPropsOf,
  UnionToArray,
} from '~/@types';
import { counterDefaultValue, useCounter } from './use-counter.composable';
import { solidjsCustomAttrs } from '~/utils/attrs';
import './counter.styles.css';

type CounterRootElement = HTMLDivElement;
type CounterForwardElement = HTMLDivElement;
type CounterAttrs = Omit<JSX.HTMLElementTags['div'], 'children'> & {
  children?: ({
    DecrementButton,
    IncrementButton,
    Count,
  }: {
    DecrementButton: Component<JSX.HTMLElementTags['button']>;
    IncrementButton: Component<JSX.HTMLElementTags['button']>;
    Count: Component<JSX.HTMLElementTags['span']>;
  }) => JSX.Element;
};
type CounterProps = {
  min?: number;
  max?: number;
  initialValue?: number;
  onDecrement?: JSX.HTMLElementTags['button']['onClick'];
  onIncrement?: JSX.HTMLElementTags['button']['onClick'];
};
type CounterCustomAttrs = JSX.CustomAttributes<CounterRootElement>;
type CounterAttrsAndProps = CounterAttrs & CounterCustomAttrs & CounterProps;
type CounterComponent = Component<CounterAttrsAndProps>;

export let Counter = undefined as unknown as CounterComponent;
Counter = ((attrsAndProps) => {
  const {
    0: rootCustomAttrs,
    1: props,
    2: rootAttrs,
  } = splitProps(attrsAndProps, solidjsCustomAttrs, [
    'min',
    'max',
    'initialValue',
    'onDecrement',
    'onIncrement',
  ] satisfies (keyof CounterProps)[]);

  const { min, max, count, setCount } = useCounter({
    min: props.min,
    max: props.max,
    initialValue: props.initialValue,
  });
  const isMinValueReached = () => min() === count();
  const isMaxValueReached = () => max() === count();
  const lengthOfCountNumber = () =>
    Math.max(`${min()}`.length, `${max()}`.length);

  const onDecrement: JSX.HTMLElementTags['button']['onClick'] = (event) => {
    if (isMinValueReached()) {
      return;
    }

    setCount(count() - 1);

    if (props.onDecrement != null) {
      if (Array.isArray(props.onDecrement)) {
        type BoundEventHandlerTuple = EventHandlerUnionTuple<
          'button',
          'onClick'
        >[1];

        const { 0: onDecrementHandler, 1: onDecrementData } =
          props.onDecrement as [
            BoundEventHandlerTuple[0],
            BoundEventHandlerTuple[1]
          ];
        onDecrementHandler(onDecrementData, event);

        return;
      }

      if (typeof props.onDecrement === 'function') {
        props.onDecrement(event);

        return;
      }
    }
  };

  const onIncrement: JSX.HTMLElementTags['button']['onClick'] = (event) => {
    if (isMaxValueReached()) {
      return;
    }

    setCount(count() + 1);

    if (props.onIncrement != null) {
      if (Array.isArray(props.onIncrement)) {
        type BoundEventHandlerTuple = EventHandlerUnionTuple<
          'button',
          'onClick'
        >[1];
        const { 0: onIncrementHandler, 1: onIncrementData } =
          props.onIncrement as [
            BoundEventHandlerTuple[0],
            BoundEventHandlerTuple[1]
          ];
        onIncrementHandler(onIncrementData, event);

        return;
      }

      if (typeof props.onIncrement === 'function') {
        props.onIncrement(event);

        return;
      }
    }
  };

  const DecrementButton: Parameters<
    NonNullable<CounterAttrs['children']>
  >[0]['DecrementButton'] = (p) => (
    <button
      {...p}
      class={`${p?.class} counter__button counter__decrement-button`}
      onClick={(event) => onDecrement(event)}
      disabled={isMinValueReached()}
    >
      -
    </button>
  );

  const Count: Parameters<NonNullable<CounterAttrs['children']>>[0]['Count'] = (
    p
  ) => (
    <span
      {...p}
      class={`${p?.class} counter__count`}
      style={{ width: `${lengthOfCountNumber()}ch` }}
    >
      {count()}
    </span>
  );

  const IncrementButton: Parameters<
    NonNullable<CounterAttrs['children']>
  >[0]['IncrementButton'] = (p) => (
    <button
      {...p}
      class={`${p?.class} counter__button counter__increment-button`}
      onClick={(event) => onIncrement(event)}
      disabled={isMaxValueReached()}
    >
      +
    </button>
  );

  console.log('"Counter" attrsAndProps:', attrsAndProps);

  return (
    <div /* ----------------- solidjs custom attrs ----------------- */
      $ServerOnly={rootCustomAttrs.$ServerOnly}
      classList={rootCustomAttrs.classList}
      ref={rootCustomAttrs.ref}
      /* ----------------- solidjs custom attrs ----------------- */
      {...rootAttrs}
      class={`${rootAttrs.class} counter`}
    >
      <Show
        when={rootAttrs.children != null}
        fallback={
          <>
            {DecrementButton}
            {Count}
            {IncrementButton}
          </>
        }
      >
        {() =>
          typeof rootAttrs.children === 'function'
            ? rootAttrs.children({
                DecrementButton,
                IncrementButton,
                Count,
              })
            : null
        }
      </Show>
    </div>
  );
}) satisfies CounterComponent;
