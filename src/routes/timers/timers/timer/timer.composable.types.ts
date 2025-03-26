import type { Accessor } from 'solid-js';
import type { Spread } from '../types';
import type { TimerInterface } from './timer.types';

export type CreateTimerReturnRecord = Spread<
  [
    Pick<
      TimerInterface,
      | 'state'
      | 'milliseconds'
      | 'start'
      | 'stop'
      | 'reset'
      | 'eachTick'
      | 'clear'
    >,
    {
      setMilliseconds: (
        predicate: (
          ms: TimerInterface['milliseconds']
        ) => TimerInterface['milliseconds']
      ) => TimerInterface['milliseconds'];
      milliseconds: Accessor<TimerInterface['milliseconds']>;
      state: Accessor<TimerInterface['state']>;
      clearEachTickCallbacks: VoidFunction;
    }
  ]
>;

export type CreateTime = () => CreateTimerReturnRecord;

export type SetupCreateTimer = <TTimer extends TimerInterface>(
  predicate: () => TTimer
) => CreateTime;
