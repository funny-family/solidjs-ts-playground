import { createSignal, DEV } from 'solid-js';
import type { Accessor, Setter } from 'solid-js';
import { isNumberInRange } from '~/utils';

type UseCounterArgs = { min?: number; max?: number; initialValue?: number };

type UseCounter = (args: UseCounterArgs) => {
  min: () => number;
  max: () => number;
  count: Accessor<number>;
  setCount: Setter<number>;
};

export const counterDefaultValue: Readonly<Required<UseCounterArgs>> = {
  min: 0,
  max: 5,
  initialValue: 1,
};

export const useCounter: UseCounter = (args, cdv = counterDefaultValue) => {
  type CounterDefaultValue = typeof cdv;

  if (args.min == null) {
    args.min = cdv.min;
  }

  if (args.max == null) {
    args.max = cdv.max;
  }

  if (args.initialValue == null) {
    args.initialValue = cdv.initialValue;
  }

  const min = (
    _args = args as CounterDefaultValue,
    _counterDefaultValue = cdv
  ) => {
    if (_args.min > _args.max) {
      if (DEV != null) {
        console.warn(
          `"min" prop is set bigger that "max" prop! Set "min" prop to default: ${_counterDefaultValue.min}`
        );
      }

      return _counterDefaultValue.min;
    }

    return _args.min;
  };

  const max = (
    _args = args as CounterDefaultValue,
    _counterDefaultValue = cdv
  ) => {
    if (_args.max < _args.min) {
      if (DEV != null) {
        console.warn(
          `"max" prop is set smaller that "min" prop! Set "max" prop to default: ${_counterDefaultValue.max}`
        );
      }

      return _counterDefaultValue.max;
    }

    return _args.max;
  };

  const initialValue = (
    _args = args as CounterDefaultValue,
    _counterDefaultValue = cdv,
    isInRange = isNumberInRange(_args.initialValue, _args.min, _args.max)
  ) => {
    if (!isInRange) {
      if (DEV != null) {
        console.warn(
          `"value" prop is not in a range of "min" and "max"! Set "value" prop to default: ${_counterDefaultValue.initialValue}`
        );
      }

      return _counterDefaultValue.initialValue;
    }

    return _args.initialValue;
  };

  const { 0: count, 1: setCount } = createSignal(initialValue());

  return {
    min,
    max,
    count,
    setCount,
  };
};
