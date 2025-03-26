import type { BaseTimer } from '../utils/base-timer/base-timer';
import type { BaseTimerInterface } from '../utils/base-timer/base-timer.types';

export interface TimerInterface {
  baseTimer: BaseTimer;
  milliseconds: number;
  state: BaseTimerInterface['state'];
  tickCallbacksSet: BaseTimerInterface['tickCallbacksSet'];
  start: () => boolean;
  stop: () => boolean;
  reset: () => boolean;
  eachTick: (callback: VoidFunction) => void;
  clear: BaseTimerInterface['clear'];
}
