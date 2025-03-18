import type { Accessor } from 'solid-js';
import { Spread } from '../types';
import type { Stopwatch } from './stopwatch';

export type CreateStopwatchReturnRecord = Spread<
  [
    Pick<
      Stopwatch,
      | 'milliseconds'
      | 'state'
      | 'start'
      | 'stop'
      | 'reset'
      | 'eachTick'
      | 'clear'
    >,
    {
      milliseconds: Accessor<Stopwatch['milliseconds']>;
      setMilliseconds: (
        predicate: CreateStopwatchReturnRecord['milliseconds']
      ) => Stopwatch['milliseconds'];
      state: Accessor<Stopwatch['state']>;
      clearEachTickCallbacks: VoidFunction;
    }
  ]
>;

export type CreateStopwatch = () => CreateStopwatchReturnRecord;

export type SetupCreateStopwatch = (
  predicate: () => Stopwatch
) => CreateStopwatch;
