import type { BaseTimerInterface } from '../utils/base-timer/base-timer.types';

export interface CountdownInterface {
  milliseconds: number;
  state: BaseTimerInterface['state'];
  tickCallbacksSet: BaseTimerInterface['tickCallbacksSet'];
  start: () => boolean;
  stop: () => boolean;
  reset: () => boolean;
  eachTick: (callback: VoidFunction) => void;
  clear: VoidFunction;
}