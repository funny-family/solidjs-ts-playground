import type { Accessor } from 'solid-js';
import { Spread } from '../types';
import type { Countdown } from './countdown';

export type CreateCountdownReturnRecord = Spread<
  [
    Pick<
      Countdown,
      | 'milliseconds'
      | 'state'
      | 'start'
      | 'stop'
      | 'reset'
      | 'eachTick'
      | 'clear'
    >,
    {
      milliseconds: Accessor<Countdown['milliseconds']>;
      setMilliseconds: (
        predicate: (ms: Countdown['milliseconds']) => Countdown['milliseconds']
      ) => Countdown['milliseconds'];
      state: Accessor<Countdown['state']>;
      clearEachTickCallbacks: VoidFunction;
    }
  ]
>;

export type CreateCountdown = () => CreateCountdownReturnRecord;

export type SetupCreateCountdown = (
  predicate: () => Countdown
) => CreateCountdown;
