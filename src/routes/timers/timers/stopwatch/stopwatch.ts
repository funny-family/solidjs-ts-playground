import type { StopwatchInterface } from './stopwatch.types';
import { BaseTimer } from '../utils/base-timer/base-timer';
import { IDEL_STATE } from '../utils/states/states';
import { Date_now } from '../utils/date.util';

// export var MAX_HOURS_IN_MILLISECONDS = 356400000;
// export var MAX_MINUTES_IN_MILLISECONDS = 3540000;
// export var MAX_MINUTES_IN_SECONDS = 59000;
/*
  356400000 + 3540000 + 59000 = 359999000
  99h 59m 59s

  360000000ms -> 100h
*/
// export var MAX_STOPWATCH_MILLISECONDS = 359999000;
export var MAX_STOPWATCH_MILLISECONDS = 360000000;

export class Stopwatch implements StopwatchInterface {
  get milliseconds() {
    return this.#milliseconds;
  }

  set milliseconds(value) {
    if (value >= MAX_STOPWATCH_MILLISECONDS) {
      this.reset();
    } else if (value < 0) {
      this.reset();
    } else {
      this.#milliseconds = value;
    }
  }

  get state() {
    return this.#baseTimer.state;
  }

  set state(value) {
    this.#baseTimer.state = value;
  }

  get tickCallbacksSet() {
    return this.#baseTimer.tickCallbacksSet;
  }

  start: StopwatchInterface['start'] = () => {
    this.#offset = Date_now();

    return this.#baseTimer.start(() => {
      this.milliseconds += this.#delta;
    });
  };

  stop: StopwatchInterface['stop'] = () => {
    return this.#baseTimer.stop(() => {
      this.#baseTimer.clear();
    });
  };

  reset: StopwatchInterface['stop'] = () => {
    // prettier-ignore
    return (
      this.state === IDEL_STATE && this.milliseconds <= 0
      ?
      false
      :
      (
        this.state = IDEL_STATE,
        this.#baseTimer.clear(),
        this.milliseconds = 0,
        true
      )
    );
  };

  eachTick: StopwatchInterface['eachTick'] = (callback) => {
    this.#baseTimer.eachTick(callback);
  };

  clear: StopwatchInterface['clear'] = () => {
    this.#baseTimer.clear();
  };

  #milliseconds: StopwatchInterface['milliseconds'] = 0;
  #baseTimer = new BaseTimer();
  #offset: number = 0;

  get #delta(): number {
    const now = Date_now();
    const newDelta = now - this.#offset;
    this.#offset = now;

    return newDelta;
  }
}
