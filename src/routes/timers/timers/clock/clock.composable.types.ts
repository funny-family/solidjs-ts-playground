import type { Accessor } from 'solid-js';
import type { ClockInterface } from './clock.types';
import type { Clock } from './clock';
import type { Spread } from '../types';

export type CreateClockReturnRecord = Spread<
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

export type CreateClock = () => CreateClockReturnRecord;

export type SetupCreateClock = (predicate: () => Clock) => CreateClock;
