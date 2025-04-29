import { Date_now } from '../../utils/date.util';
import { Timer } from '../timer';
import { TimerInterface } from '../timer.types';

export class Countdown extends Timer implements TimerInterface {
  constructor() {
    super();

    this.tickCallbacksSet.add(() => {
      this.milliseconds = this.#offsetTime - Date_now();
    });
  }

  get milliseconds() {
    return super.milliseconds;
  }

  set milliseconds(value) {
    super.milliseconds = value;
    this.#offsetTime = this.milliseconds + Date_now();
  }

  start: TimerInterface['start'] = () => {
    return (
      this.milliseconds <= 0
      ?
      false
      :
      this.baseTimer.start(() => {
        this.#offsetTime = this.milliseconds + Date_now();
      })
    );
  };

  #offsetTime: number = 0;
}
