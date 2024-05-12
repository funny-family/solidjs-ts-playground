import { DEV, createSignal } from 'solid-js';
import { isNumberInRange } from '~/utils';
import { createGlobalState } from '~/utils/create-global-state.util';
import type { CounterInterface } from './counter.utils';
import { Counter, counterDefaultValue } from './counter.utils';

const _counter = new Counter(
  counterDefaultValue.initialValue,
  counterDefaultValue.min,
  counterDefaultValue.max
);

export const useCounterStore = createGlobalState(() => {
  const counter = _counter;

  if (!isNumberInRange(counter.initialValue, counter.min, counter.max)) {
    if (DEV != null) {
      console.warn(
        `"value" prop is not in a range of "min" and "max"! Set "value" prop to default: ${counterDefaultValue.initialValue}`
      );
    }

    counter.initialValue = counterDefaultValue.initialValue;
  }

  if (counter.min > counter.max) {
    if (DEV != null) {
      console.warn(
        `"min" prop is set bigger that "max" prop! Set "min" prop to default: ${counterDefaultValue.min}`
      );
    }

    counter.max = counterDefaultValue.min;
  }

  if (counter.max < counter.min) {
    if (DEV != null) {
      console.warn(
        `"max" prop is set smaller that "min" prop! Set "max" prop to default: ${counterDefaultValue.max}`
      );
    }

    counter.max = counterDefaultValue.max;
  }

  const { 0: count, 1: setCount } = createSignal(counter.initialValue);

  const isMinValueReached = () => count() === counter.min;

  const isMaxValueReached = () => count() === counter.max;

  const decrement = () => {
    if (isMinValueReached()) {
      return;
    }

    counter.decrement();
    setCount(counter.count);
  };

  const increment = () => {
    if (isMaxValueReached()) {
      return;
    }

    counter.increment();
    setCount(counter.count);
  };

  return {
    config: counter as Pick<CounterInterface, 'initialValue' | 'min' | 'max'>,
    isMinValueReached,
    isMaxValueReached,
    count,
    decrement,
    increment,
  };
});
