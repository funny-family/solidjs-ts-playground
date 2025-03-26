import type { TimerInterface } from './timer.types';
import { BaseTimer } from '../utils/base-timer/base-timer';
import { IDEL_STATE } from '../utils/states/states';

/*
  360000000ms -> 100h
*/
export var MAX_TIMER_MILLISECONDS = 360000000;

export class Timer implements TimerInterface {
  baseTimer: BaseTimer = new BaseTimer();

  get milliseconds() {
    return this.#milliseconds;
  }

  set milliseconds(value) {
    // prettier-ignore
    (
      (value >= MAX_TIMER_MILLISECONDS)
      ||
      (value <= 0)
    ) ? (
      this.reset()
    ) : (
      this.#milliseconds = value
    );
  }

  get state() {
    return this.baseTimer.state;
  }

  set state(value) {
    this.baseTimer.state = value;
  }

  get tickCallbacksSet() {
    return this.baseTimer.tickCallbacksSet;
  }

  start: TimerInterface['start'] = () => {
    return true;
  };

  stop: TimerInterface['stop'] = () => {
    return this.baseTimer.stop(() => {
      this.baseTimer.clear();
    });
  };

  reset: TimerInterface['stop'] = () => {
    // prettier-ignore
    return (
      this.state === IDEL_STATE && this.milliseconds <= 0
      ?
      false
      :
      (
        this.state = IDEL_STATE,
        this.baseTimer.clear(),
        this.#milliseconds = 0,
        true
      )
    );
  };

  eachTick: TimerInterface['eachTick'] = (callback) => {
    this.baseTimer.eachTick(callback);
  };

  clear: TimerInterface['clear'] = () => {
    this.baseTimer.clear();
  };

  #milliseconds: TimerInterface['milliseconds'] = 0;
}
