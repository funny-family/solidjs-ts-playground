import { createSignal } from 'solid-js';
import type { Accessor, Setter } from 'solid-js';
import { isNumberInRange } from '~/utils';

type UseCounterArgs = { min: number; max: number; initialValue: number };

type UseCounter = (args: UseCounterArgs) => {
  min: () => number;
  max: () => number;
  // initialValue: () => number;
  count: Accessor<number>;
  setCount: Setter<number>;
};

export const counterDefaultValue: UseCounterArgs = {
  min: 0,
  max: 5,
  initialValue: 1,
};

export const useCounter: UseCounter = (args: UseCounterArgs) => {
  const min = () => {
    if (args.min > args.max) {
      console.warn(
        `"min" prop is set bigger that "max" prop! Set "min" prop to default: ${counterDefaultValue.min}`
      );

      return counterDefaultValue.min;
    }

    return args.min;
  };
  const max = () => {
    if (args.max < args.min) {
      console.warn(
        `"max" prop is set smaller that "min" prop! Set "max" prop to default: ${counterDefaultValue.max}`
      );

      return counterDefaultValue.max;
    }

    return args.max;
  };
  const initialValue = () => {
    if (isNumberInRange(args.initialValue, args.min, args.max) === false) {
      console.warn(
        `"value" prop is not in a range of "min" and "max"! Set "value" prop to default: ${counterDefaultValue.initialValue}`
      );

      return counterDefaultValue.initialValue;
    }

    return args.initialValue;
  };

  const [count, setCount] = createSignal(initialValue());

  return {
    min,
    max,
    // initialValue,
    count,
    setCount,
  };
};
