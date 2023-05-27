import { createSignal, DEV } from 'solid-js';
import type { Accessor, Setter } from 'solid-js';
import { isNumberInRange } from '~/utils';

type UseCounterArgs = { min?: number; max?: number; initialValue?: number };

type UseCounter = (args: UseCounterArgs) => {
  min: Accessor<number>;
  max: Accessor<number>;
  count: Accessor<number>;
  setCount: Setter<number>;
};

export const counterDefaultValue: Readonly<Required<UseCounterArgs>> = {
  min: 0,
  max: 5,
  initialValue: 1,
};

type Writeable<T> = { -readonly [P in keyof T]: T[P] };
/**
 * @see https://stackoverflow.com/a/53050575
 */
type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export const useCounter = ((args: {
  min: number;
  max: number;
  initialValue: number;
}) => {
  if (args.min == null) {
    args.min = counterDefaultValue.min;
  }

  if (args.max == null) {
    args.max = counterDefaultValue.max;
  }

  if (args.initialValue == null) {
    args.initialValue = counterDefaultValue.initialValue;
  }

  const min = () => {
    if (args.min > args.max) {
      if (DEV != null) {
        console.warn(
          `"min" prop is set bigger that "max" prop! Set "min" prop to default: ${counterDefaultValue.min}`
        );
      }

      return counterDefaultValue.min;
    }

    return args.min;
  };

  const max = () => {
    if (args.max < args.min) {
      if (DEV != null) {
        console.warn(
          `"max" prop is set smaller that "min" prop! Set "max" prop to default: ${counterDefaultValue.max}`
        );
      }

      return counterDefaultValue.max;
    }

    return args.max;
  };

  const initialValue = () => {
    if (!isNumberInRange(args.initialValue, args.min, args.max)) {
      if (DEV != null) {
        console.warn(
          `"value" prop is not in a range of "min" and "max"! Set "value" prop to default: ${counterDefaultValue.initialValue}`
        );
      }

      return counterDefaultValue.initialValue;
    }

    return args.initialValue;
  };

  const { 0: count, 1: setCount } = createSignal(initialValue());

  return {
    min,
    max,
    count,
    setCount,
  };
}) as UseCounter;
