import type { StopwatchInterface } from './stopwatch.types';
import { BaseTimer } from '../utils/base-timer/base-timer';
import { IDEL_STATE } from '../utils/states/states';

export class Stopwatch implements StopwatchInterface {
  milliseconds: StopwatchInterface['milliseconds'] = 0;
  // #milliseconds: StopwatchInterface['milliseconds'] = 0;

  // get milliseconds() {
  //   return this.#milliseconds;
  // }

  // set milliseconds(value) {
  //   this.#milliseconds = value;
  // }

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
    this.#offset = Date.now();

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
    if (this.state === IDEL_STATE && this.milliseconds <= 0) {
      return false;
    }

    this.state = IDEL_STATE;
    this.#baseTimer.clear();
    this.milliseconds = 0;

    return true;
  };

  eachTick: StopwatchInterface['eachTick'] = (callback) => {
    this.#baseTimer.eachTick(callback);
  };

  clear: StopwatchInterface['clear'] = () => {
    this.#baseTimer.clear();
  };

  #baseTimer = new BaseTimer();

  #offset: number = 0;

  get #delta(): number {
    const now = Date.now();
    const newDelta = now - this.#offset;
    this.#offset = now;

    return newDelta;
  }
}
