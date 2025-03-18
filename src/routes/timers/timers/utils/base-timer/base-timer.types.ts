import type { TimerBaseState } from '../states/states.types';

export interface BaseTimerInterface {
  tickCallbacksSet: Set<VoidFunction>;
  state: TimerBaseState;
  start: (callback: VoidFunction) => boolean;
  stop: (callback: VoidFunction) => boolean;
  eachTick: (callback: VoidFunction) => void;
  clear: VoidFunction;
}
