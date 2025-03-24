import type { TimeRunnerInterface } from './time-runner.types';

export class TimeRunner implements TimeRunnerInterface {
  id: TimeRunnerInterface['id'] = 0;

  start(
    callback: Parameters<TimeRunnerInterface['start']>[0]
  ): ReturnType<TimeRunnerInterface['start']> {
    this.id = requestAnimationFrame(() => {
      callback();

      this.start(callback);
    });

    return this.id;
  }

  stop(): ReturnType<TimeRunnerInterface['stop']> {
    // prettier-ignore
    return (
      this.id
      ?
      (
        cancelAnimationFrame(this.id),
        this.id = 0,
        true
      )
      :
      false
    );
  }
}
