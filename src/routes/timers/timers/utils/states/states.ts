import type {
  IsRunningFunction,
  TimerIdelState,
  TimerRunningState,
  TimerStoppedState,
} from './states.types';

export var IDEL_STATE: TimerIdelState = 0;
export var RUNNING_STATE: TimerRunningState = 1;
export var STOPPED_STATE: TimerStoppedState = 2;

export var isRunning: IsRunningFunction = (state) => state === RUNNING_STATE;
