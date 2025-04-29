import type { Accessor } from 'solid-js';
import type { DependentMap, Entry, Spread } from '../types';
import type { TimerInterface } from './timer.types';

export type TimerRecord = Spread<
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

export type TimerRecordEntry = Entry<TimerRecord>;

export type CreateTime = () => DependentMap<TimerRecordEntry>;

export type CreateTimerSetup = <TTimer extends TimerInterface>(
  predicate: () => TTimer
) => CreateTime;
