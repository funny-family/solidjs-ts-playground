import type { ClockInterface } from './clock.types';
import { BaseTimer } from '../utils/base-timer/base-timer';
import { Date_now } from '../utils/date.util';

export class Clock implements ClockInterface {
  constructor() {
    this.tickCallbacksSet.add(() => {
      this.date.setTime(Date_now());
      // this.date.setMilliseconds(this.date.getMilliseconds() + 5);
      // console.log(this.date);
    });
  }

  date: ClockInterface['date'] = new Date();

  get state() {
    return this.#baseTimer.state;
  }

  get tickCallbacksSet() {
    return this.#baseTimer.tickCallbacksSet;
  }

  start: ClockInterface['start'] = () => {
    return this.#baseTimer.start(() => {});
  };

  stop: ClockInterface['stop'] = () => {
    return this.#baseTimer.stop(() => {
      this.#baseTimer.clear();
    });
  };

  eachTick: ClockInterface['eachTick'] = (callback) => {
    this.#baseTimer.eachTick(callback);
  };

  clear: ClockInterface['clear'] = () => {
    this.#baseTimer.clear();
  };

  #baseTimer = new BaseTimer();
}

// ====================================================================
