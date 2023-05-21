import { splitProps, mergeProps, Show, Accessor } from 'solid-js';
import type { Component, JSX } from 'solid-js';
import type {
  EventHandlerUnionTuple,
  HTMLElementPropsOf,
  UnionToArray,
} from '~/@types';
import { counterDefaultValue, useCounter } from './use-counter.composable';
import './Counter.css';
import { solidjsCustomAttrs } from '~/utils/attrs';
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
  const defaultAttrsAndProps = {
    min: counterDefaultValue.min,
    max: counterDefaultValue.max,
    initialValue: counterDefaultValue.initialValue,
  } satisfies CounterAttrsAndProps;
  attrsAndProps = mergeProps(defaultAttrsAndProps, attrsAndProps);
  type AttrsAndProps = CounterAttrsAndProps & typeof defaultAttrsAndProps;
  const {
    0: props,
    1: customAttrs,
    2: attrs,
  } = splitProps(
    attrsAndProps as AttrsAndProps,
    [
      'min',
      'max',
      'initialValue',
      'onDecrement',
      'onIncrement',
    ] satisfies (keyof CounterProps)[],
    solidjsCustomAttrs
  );

  const { min, max, count, setCount } = useCounter({
    min: props.min,
    max: props.max,
    initialValue: props.initialValue,
  });
  const isMinValueReached = () => min() === count();
  const isMaxValueReached = () => max() === count();
  const lengthOfCountNumber = Math.max(`${min()}`.length, `${max()}`.length);

  const onDecrement: JSX.HTMLElementTags['button']['onClick'] = (event) => {
    console.log('"onDecrement" event:', event);

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
        onDecrementHandler(null, event);

        return;
      }

      if (typeof props.onDecrement === 'function') {
        props.onDecrement(event);

        return;
      }
    }
  };

  const onIncrement: JSX.HTMLElementTags['button']['onClick'] = (event) => {
    console.log('"onIncrement" event:', event);

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
        onIncrementHandler(null, event);

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
      onClick={onDecrement}
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
      style={{ width: `${lengthOfCountNumber}ch` }}
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
    <div {...customAttrs} {...attrs} class={`${attrs.class} counter`}>
      <Show
        when={attrs.children != null}
        fallback={
          <>
            {DecrementButton}
            {Count}
            {IncrementButton}
          </>
        }
      >
        {() =>
          typeof attrs.children === 'function'
            ? attrs.children({
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
