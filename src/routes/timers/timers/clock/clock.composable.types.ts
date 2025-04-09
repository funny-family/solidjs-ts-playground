import type { Accessor } from 'solid-js';
import type { ClockInterface } from './clock.types';
import type { Clock } from './clock';
import type { DependentMap, Entry, Spread } from '../types';

export type SetupClockReturnRecord = Spread<
  [
    Pick<
      ClockInterface,
      'state' | 'date' | 'start' | 'stop' | 'eachTick' | 'clear'
    >,
    {
      state: Accessor<ClockInterface['state']>;
      date: Accessor<ClockInterface['date']>;
      clearEachTickCallbacks: VoidFunction;
    }
  ]
>;

export type SetupClockReturnRecordEntry = Entry<SetupClockReturnRecord>;

export type SetupClock = () => DependentMap<SetupClockReturnRecordEntry>;

export type CreateClockSetup = (predicate: () => Clock) => SetupClock;
