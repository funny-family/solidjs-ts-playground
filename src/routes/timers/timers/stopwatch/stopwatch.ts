import type { StopwatchInterface } from './stopwatch.types';
import { Date_now } from '../utils/date.util';
import { TimerInterface } from '../timer/timer.types';
import { Timer } from '../timer/timer';

export class Stopwatch extends Timer implements TimerInterface {
  constructor() {
    super();

    this.tickCallbacksSet.add(() => {
      this.milliseconds += this.#delta;
    });
  }

  start: StopwatchInterface['start'] = () => {
    return this.baseTimer.start(() => {
      this.#offset = Date_now();
    });
  };

  #offset: number = 0;

  get #delta(): number {
    const now = Date_now();
    const newDelta = now - this.#offset;
    this.#offset = now;

    return newDelta;
  }
}
