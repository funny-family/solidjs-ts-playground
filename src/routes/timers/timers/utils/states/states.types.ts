// idel
export type TimerIdelState = 0;
// running
export type TimerRunningState = 1;
// stopped
export type TimerStoppedState = 2;

export type TimerBaseState =
  | TimerIdelState
  | TimerRunningState
  | TimerStoppedState;
