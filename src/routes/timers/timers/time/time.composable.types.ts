import type { Accessor } from 'solid-js';
import type { TimeInterface } from './time.types';
import type { Time } from './time';
import type { Spread } from '../types';

export type CreateTime = Spread<
  [
    Pick<
      TimeInterface,
      'state' | 'date' | 'start' | 'stop' | 'eachTick' | 'clear'
    >,
    {
      state: Accessor<TimeInterface['state']>;
      date: Accessor<TimeInterface['date']>;
      clearEachTickCallbacks: VoidFunction;
    }
  ]
>;

export type SetupCreateTime = (predicate: () => Time) => () => CreateTime;
