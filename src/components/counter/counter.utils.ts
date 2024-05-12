export interface CounterInterface {
  initialValue: number;
  min: number;
  max: number;
  count: number;
  decrement: () => void;
  increment: () => void;
}

export const counterDefaultValue = {
  initialValue: 1,
  min: 0,
  max: 5,
} as const;

export class Counter implements CounterInterface {
  initialValue = counterDefaultValue.initialValue as number;
  min = counterDefaultValue.min as number;
  max = counterDefaultValue.max as number;
  count = this.initialValue as number;

  constructor(initialValue: number, min: number, max: number) {
    this.initialValue = initialValue;
    this.min = min;
    this.max = max;
  }

  decrement: CounterInterface['decrement'] = () => {
    this.count -= 1;
  };

  increment: CounterInterface['increment'] = () => {
    this.count += 1;
  };
}
