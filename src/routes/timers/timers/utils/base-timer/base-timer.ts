import { IDEL_STATE, RUNNING_STATE, STOPPED_STATE } from '../states/states';
import { TimeRunner } from '../time-runner/time-runner';
import type { BaseTimerInterface } from './base-timer.types';

export class BaseTimer implements BaseTimerInterface {
  state: BaseTimerInterface['state'] = IDEL_STATE;
  tickCallbacksSet: BaseTimerInterface['tickCallbacksSet'] = new Set();

  start(
    callback: Parameters<BaseTimerInterface['start']>[0]
  ): ReturnType<BaseTimerInterface['start']> {
    // prettier-ignore
    return (
      this.state === RUNNING_STATE
      ?
      false
      :
      (
        this.state = RUNNING_STATE,
        callback(),
        this.#timeRunner.start(() => {
          this.tickCallbacksSet.forEach((updateCallback) => {
            updateCallback();
          });
        }),
        true
      )
    );
  }

  stop(
    callback: Parameters<BaseTimerInterface['start']>[0]
  ): ReturnType<BaseTimerInterface['stop']> {
    // prettier-ignore
    return (
      this.state === STOPPED_STATE || this.state === IDEL_STATE
      ?
      false
      :
      (
        this.state = STOPPED_STATE,
        this.#timeRunner.stop(),
        callback(),
        true
      )
    );
  }

  eachTick(
    callback: Parameters<BaseTimerInterface['eachTick']>[0]
  ): ReturnType<BaseTimerInterface['eachTick']> {
    this.tickCallbacksSet.add(callback);
  }

  clear() {
    this.#timeRunner.stop();
  }

  #timeRunner: TimeRunner = new TimeRunner();
}
