import type { TimeInterface } from './time.types';
import { BaseTimer } from '../utils/base-timer/base-timer';

export class Time implements TimeInterface {
  date: TimeInterface['date'] = new Date();

  get state() {
    return this.#baseTimer.state;
  }

  get tickCallbacksSet() {
    return this.#baseTimer.tickCallbacksSet;
  }

  start: TimeInterface['start'] = () => {
    return this.#baseTimer.start(() => {
      this.date.setTime(Date.now());
    });
  };

  stop: TimeInterface['stop'] = () => {
    return this.#baseTimer.stop(() => {
      this.#baseTimer.clear();
    });
  };

  eachTick: TimeInterface['eachTick'] = (callback) => {
    this.#baseTimer.eachTick(callback);
  };

  clear: TimeInterface['clear'] = () => {
    this.#baseTimer.clear();
  };

  #baseTimer = new BaseTimer();
}

// ====================================================================
