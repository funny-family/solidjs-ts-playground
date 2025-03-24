import type { CountdownInterface } from './countdown.types';
import { BaseTimer } from '../utils/base-timer/base-timer';
import { Date_now } from '../utils/date.util';
import { IDEL_STATE } from '../utils/states/states';
import { TimerInterface } from '../timer/timer.types';
import { Timer } from '../timer/timer';

// /*
//   360000000ms -> 100h
// */
// export var MAX_COUNTDOWN_MILLISECONDS = 360000000;

// export class Countdown implements CountdownInterface {
//   constructor() {
//     this.tickCallbacksSet.add(() => {
//       this.milliseconds = this.#offsetTime - Date_now();
//     });
//   }

//   get milliseconds() {
//     return this.#milliseconds;
//   }

//   set milliseconds(value) {
//     // prettier-ignore
//     (
//       (value >= MAX_COUNTDOWN_MILLISECONDS)
//       ||
//       (value <= 0)
//     ) ? (
//       this.reset()
//     ) : (
//       this.#milliseconds = value
//     );
//   }

//   get state() {
//     return this.#baseTimer.state;
//   }

//   set state(value) {
//     this.#baseTimer.state = value;
//   }

//   get tickCallbacksSet() {
//     return this.#baseTimer.tickCallbacksSet;
//   }

//   start: CountdownInterface['start'] = () => {
//     const result = this.#baseTimer.start(() => {
//       this.#offsetTime = this.milliseconds + Date_now();
//     });

//     // prettier-ignore
//     return (
//       result
//       ?
//       (
//         this.#offsetTime = this.#milliseconds + Date_now(),
//         result
//       )
//       :
//       result
//     );
//   };

//   stop: CountdownInterface['stop'] = () => {
//     return this.#baseTimer.stop(() => {
//       this.#baseTimer.clear();
//     });
//   };

//   reset: CountdownInterface['stop'] = () => {
//     // prettier-ignore
//     return (
//       this.state === IDEL_STATE && this.#milliseconds <= 0
//       ?
//       false
//       :
//       (
//         this.state = IDEL_STATE,
//         this.#baseTimer.clear(),
//         this.#milliseconds = 0,
//         true
//       )
//     );
//   };

//   eachTick: CountdownInterface['eachTick'] = (callback) => {
//     this.#baseTimer.eachTick(callback);
//   };

//   clear: CountdownInterface['clear'] = () => {
//     this.#baseTimer.clear();
//   };

//   #milliseconds: CountdownInterface['milliseconds'] = 0;
//   #baseTimer: BaseTimer = new BaseTimer();
//   #offsetTime: number = 0;
// }

export class Countdown extends Timer implements TimerInterface {
  constructor() {
    super();

    this.tickCallbacksSet.add(() => {
      this.milliseconds = this.#offsetTime - Date_now();
    });
  }

  start: CountdownInterface['start'] = () => {
    const result = this.baseTimer.start(() => {
      this.#offsetTime = this.milliseconds + Date_now();
    });

    // prettier-ignore
    return (
      result
      ?
      (
        this.#offsetTime = this.milliseconds + Date_now(),
        result
      )
      :
      result
    );
  };

  #offsetTime: number = 0;
}
