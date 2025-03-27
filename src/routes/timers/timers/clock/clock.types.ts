import type { BaseTimerInterface } from '../utils/base-timer/base-timer.types';

export type ClockInterface = {
  date: Date;
  state: BaseTimerInterface['state'];
  tickCallbacksSet: BaseTimerInterface['tickCallbacksSet'];
  start: () => boolean;
  stop: () => boolean;
  eachTick: (callback: VoidFunction) => void;
  clear: VoidFunction;
};
