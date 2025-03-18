import type { Spread } from '../types';
import type { CreateTime } from './types';

export type ListenerType = 'start' | 'stop';

export type OnMethod = <TFunction extends Function>(
  type: ListenerType,
  listener: TFunction
) => void;

export type ClearEvents = (type: ListenerType) => void;

export type WithBaseEventsReturnRecord<TTime extends CreateTime> = TTime & {
  on: OnMethod;
};

export var withBaseEvents = <TTime extends CreateTime>(time: TTime) => {
  var startEventsSet = new Set<Function>();
  var stopEventsSet = new Set<Function>();

  var time_start = time.start;
  const start: CreateTime['start'] = () => {
    const result = time_start();

    // prettier-ignore
    return (
      result
      ?
      (
        startEventsSet.forEach((listener) => {
          listener();
        }),
        result
      )
      :
      result
    )
  };

  var time_stop = time.stop;
  const stop: CreateTime['stop'] = () => {
    const result = time_stop();

    // prettier-ignore
    return (
      result
      ?
      (
        stopEventsSet.forEach((listener) => {
          listener();
        }),
        result
      )
      :
      result
    )
  };

  const on: OnMethod = (type, listener) => {
    type === 'start' && startEventsSet.add(listener);
    type === 'stop' && stopEventsSet.add(listener);
  };

  const clearEvents: ClearEvents = (type) => {
    type === 'start' && startEventsSet.clear();
    type === 'stop' && stopEventsSet.clear();
  };

  return {
    ...time,
    start,
    stop,
    on,
    clearEvents,
  };
};
