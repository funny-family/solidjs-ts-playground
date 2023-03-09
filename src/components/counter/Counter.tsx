import { splitProps, mergeProps, Show } from 'solid-js';
import type { Ref, Component, JSX } from 'solid-js';
import type {
  HTMLElementPropsOf,
  Override,
  UnionToArray,
  UniqueArray,
} from '~/@types';
import { counterDefaultValue, useCounter } from './use-counter.composable';
// import {
//   DecrementButton,
//   DecrementButtonExportedComponent,
// } from './components/decrement-button/decrement-button.component';
// import {
//   IncrementButton,
//   IncrementButtonExportedComponent,
// } from './components/increment-button/increment-button.component';
import './Counter.css';
import { solidjsCustomAttrs } from '~/utils/attrs';

type CounterRootElement = HTMLDivElement;
type CounterForwardElement = HTMLDivElement;
type CounterAttrs = Override<
  JSX.HTMLElementTags['div'],
  {
    children?: ({
      DecrementButton,
      IncrementButton,
      Count,
    }: {
      DecrementButton: Component<JSX.HTMLElementTags['button']>;
      IncrementButton: Component<JSX.HTMLElementTags['button']>;
      Count: Component;
    }) => JSX.Element;
  }
>;
type CounterProps = {
  min?: number;
  max?: number;
  initialValue?: number;
  onDecrement?: JSX.HTMLElementTags['button']['onClick'];
  onIncrement?: JSX.HTMLElementTags['button']['onClick'];
};
type CounterCustomAttrs = JSX.CustomAttributes<CounterRootElement>;
type CounterAttrsAndProps = CounterAttrs & CounterCustomAttrs & CounterProps;
type CounterExportedComponent = Component<CounterAttrsAndProps>;
type CounterLocalComponent = Component<CounterAttrsAndProps>;
type CounterComponent = Component<CounterAttrsAndProps>;

export let Counter = undefined as unknown as CounterComponent;
Counter = ((incomingAttrsAndProps) => {
  const defaultAttrsAndProps = {
    min: counterDefaultValue.min,
    max: counterDefaultValue.max,
    initialValue: counterDefaultValue.initialValue,
  } satisfies CounterAttrsAndProps;
  incomingAttrsAndProps = mergeProps(
    defaultAttrsAndProps,
    incomingAttrsAndProps
  );
  type IncomingAttrsAndProps = CounterAttrsAndProps &
    typeof defaultAttrsAndProps;
  const [props, customAttrs, attrs] = splitProps(
    incomingAttrsAndProps as IncomingAttrsAndProps,
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

  const onDecrement: HTMLElementPropsOf<'button'>['onClick'] = (event) => {
    console.log('"onDecrement" event:', event);

    if (isMinValueReached()) {
      return;
    }

    setCount(count() - 1);

    if (props.onDecrement != null) {
      if (Array.isArray(props.onDecrement)) {
        type UnionOfOnCLickHandler = [
          UnionToArray<
            NonNullable<HTMLElementPropsOf<'button'>['onClick']>
          >[1][0],
          UnionToArray<
            NonNullable<HTMLElementPropsOf<'button'>['onClick']>
          >[1][1]
        ];

        const [onDecrementHandler, onDecrementData] =
          props.onDecrement as UnionOfOnCLickHandler;
        onDecrementHandler(null, event);

        return;
      }

      if (typeof props.onDecrement === 'function') {
        props.onDecrement(event);

        return;
      }
    }
  };

  const onIncrement: HTMLElementPropsOf<'button'>['onClick'] = (event) => {
    console.log('"onIncrement" event:', event);

    if (isMaxValueReached()) {
      return;
    }

    setCount(count() + 1);

    if (props.onIncrement != null) {
      if (Array.isArray(props.onIncrement)) {
        type UnionOfOnCLickHandler = [
          UnionToArray<
            NonNullable<HTMLElementPropsOf<'button'>['onClick']>
          >[1][0],
          UnionToArray<
            NonNullable<HTMLElementPropsOf<'button'>['onClick']>
          >[1][1]
        ];

        const [onIncrementHandler, onIncrementData] =
          props.onIncrement as UnionOfOnCLickHandler;
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
      class="counter__button counter__decrement-button"
      onClick={onDecrement}
      disabled={isMinValueReached()}
    >
      -
    </button>
  );

  const Count: Parameters<NonNullable<CounterAttrs['children']>>[0]['Count'] = (
    p
  ) => (
    <span class="counter__count" style={{ width: `${lengthOfCountNumber}ch` }}>
      {count()}
    </span>
  );

  const IncrementButton: Parameters<
    NonNullable<CounterAttrs['children']>
  >[0]['IncrementButton'] = (p) => (
    <button
      class="counter__button counter__increment-button"
      onClick={(event) => onIncrement(event)}
      disabled={isMaxValueReached()}
    >
      +
    </button>
  );

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
        children={
          typeof attrs.children === 'function'
            ? attrs.children({
                DecrementButton,
                IncrementButton,
                Count,
              })
            : null
        }
      />
    </div>
  );
}) satisfies CounterComponent;
