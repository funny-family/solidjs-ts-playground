import type { Accessor } from 'solid-js';
import { Spread } from '../types';
import type { Stopwatch } from './stopwatch';

export type CreateStopwatchReturnRecord = Spread<
  [
    Pick<
      Stopwatch,
      | 'milliseconds'
      // | 'date'
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
        predicate: (ms: Stopwatch['milliseconds']) => Stopwatch['milliseconds']
      ) => Stopwatch['milliseconds'];
      // date: Accessor<Stopwatch['date']>;
      state: Accessor<Stopwatch['state']>;
      clearEachTickCallbacks: VoidFunction;
    }
  ]
>;

export type CreateStopwatch = () => CreateStopwatchReturnRecord;

export type SetupCreateStopwatch = (
  predicate: () => Stopwatch
) => CreateStopwatch;
