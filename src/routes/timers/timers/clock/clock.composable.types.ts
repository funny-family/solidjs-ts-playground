import type { Accessor } from 'solid-js';
import type { ClockInterface } from './clock.types';
import type { Clock } from './clock';
import type { DependentMap, Entry, Spread } from '../types';

export type ClockRecord = Spread<
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

export type ClockRecordEntry = Entry<ClockRecord>;

export type SetupClock = () => DependentMap<ClockRecordEntry>;

export type CreateClockSetup = (predicate: () => Clock) => SetupClock;
