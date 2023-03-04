import { splitProps, mergeProps } from 'solid-js';
import type { Ref, Component } from 'solid-js';
import type { HTMLElementPropsOf, UnionToArray } from '~/@types';
import { counterDefaultValue, useCounter } from './use-counter.composable';
import './Counter.css';

type CounterForwardElement = HTMLDivElement;
type CounterAttrs = HTMLElementPropsOf<'div'>;
type CounterProps = {
  min?: number;
  max?: number;
  initialValue?: number;
  ref?: Ref<CounterForwardElement>;
  onDecrement?: HTMLElementPropsOf<'button'>['onClick'];
  onIncrement?: HTMLElementPropsOf<'button'>['onClick'];
};
type CounterAttrsAndProps = CounterAttrs & CounterProps;

type CounterPropsKeys = (keyof CounterProps)[];

type OmittedAttrs = 'innerHTML' | 'innerText' | 'textContent' | 'about';
type OmittedProps = 'children';
type OmittedAttrsAndProps = OmittedAttrs | OmittedProps;
type OmittedAttrsAndPropsKeys = OmittedAttrsAndProps[];

export type CounterExportedComponent = Component<
  Omit<CounterAttrsAndProps, OmittedAttrs>
>;
type CounterLocalComponent = Component<CounterAttrsAndProps>;

export let Counter = undefined as unknown as CounterExportedComponent;
Counter = ((incomingProps) => {
  const defaultAttrsAndProps = {
    min: counterDefaultValue.min,
    max: counterDefaultValue.max,
    initialValue: counterDefaultValue.initialValue,
  } satisfies CounterAttrsAndProps;
  incomingProps = mergeProps(defaultAttrsAndProps, incomingProps);
  type IncomingProps = CounterAttrsAndProps & typeof defaultAttrsAndProps;
  const [, props, attrs] = splitProps(
    incomingProps as IncomingProps,
    [
      'children',
      'innerHTML',
      'innerText',
      'textContent',
      'about',
    ] satisfies OmittedAttrsAndPropsKeys,
    [
      'min',
      'max',
      'initialValue',
      'ref',
      'onDecrement',
      'onIncrement',
    ] satisfies CounterPropsKeys
  );

  // console.group();
  // console.log('props:', props);
  // console.log('attrs:', attrs);
  // console.groupEnd();

  const { min, max, count, setCount } = useCounter({
    min: props.min,
    max: props.max,
    initialValue: props.initialValue,
  });
  const isMinValueReached = () => min() === count();
  const isMaxValueReached = () => max() === count();
  const lengthOfCountNumber = Math.max(`${min()}`.length, `${max()}`.length);

  console.group();
  console.log('min:', min());
  console.log('max:', max());
  console.log('props.initialValue:', props.initialValue);
  console.groupEnd();

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

        const [onDecrementHandler, onDecrementHandlerData] =
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

        const [onIncrementHandler, onIncrementHandlerData] =
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

  return (
    <div {...attrs} ref={props.ref} class={`${attrs.class} counter`}>
      <button
        class="counter__decrement-button"
        onClick={onDecrement}
        disabled={isMinValueReached()}
      >
        -
      </button>
      <span
        class="counter__count"
        style={{ width: `${lengthOfCountNumber}ch` }}
      >
        {count()}
      </span>
      <button
        class="counter__increment-button"
        onClick={onIncrement}
        disabled={isMaxValueReached()}
      >
        +
      </button>
    </div>
  );
}) satisfies CounterLocalComponent;
