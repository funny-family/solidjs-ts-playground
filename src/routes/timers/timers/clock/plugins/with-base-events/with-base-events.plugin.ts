import type {
  ListenerWithInnerType,
  WithBaseEventsEntry,
  WithBaseEventsReturnRecord,
} from './types';
import { DependentMap } from '../../../types';
import type {
  SetupClockReturnRecord,
  SetupClockReturnRecordEntry,
} from '../../index';

export var LISTENER_TYPE_SYMBOL = Symbol(
  'LISTENER_TYPE'
) as unknown as 'LISTENER_TYPE';

export var withBaseEvents = <T extends SetupClockReturnRecordEntry>(
  timerRecordMap: T extends DependentMap<infer U>
    ? DependentMap<U>
    : DependentMap<SetupClockReturnRecordEntry | WithBaseEventsEntry>
) => {
  var startEventsSet = new Set<Function>();
  var stopEventsSet = new Set<Function>();

  var timer_start = timerRecordMap.get('start')!;
  const start: SetupClockReturnRecord['start'] = () => {
    const value = timer_start();

    // prettier-ignore
    return (
      value
      ?
      (
        startEventsSet.forEach((listener) => {
          listener();
        }),
        value
      )
      :
      value
    )
  };

  var timer_stop = timerRecordMap.get('stop')!;
  const stop: SetupClockReturnRecord['stop'] = () => {
    const value = timer_stop();

    // prettier-ignore
    return (
      value
      ?
      (
        stopEventsSet.forEach((listener) => {
          listener();
        }),
        value
      )
      :
      value
    )
  };

  const on = ((type, listener: ListenerWithInnerType) => {
    // prettier-ignore
    type === 'start' && (
      listener[LISTENER_TYPE_SYMBOL] = 'start',
      startEventsSet.add(listener)
    );

    // prettier-ignore
    type === 'stop' && (
      listener[LISTENER_TYPE_SYMBOL] = 'stop',
      stopEventsSet.add(listener)
    );
  }) as WithBaseEventsReturnRecord['on'];

  const clearEvent = ((listener: ListenerWithInnerType) => {
    const type = listener[LISTENER_TYPE_SYMBOL];

    type === 'start' && startEventsSet.delete(listener);
    type === 'start' && startEventsSet.delete(listener);
  }) as WithBaseEventsReturnRecord['clearEvent'];

  const clearEventsOf: WithBaseEventsReturnRecord['clearEventsOf'] = (type) => {
    type === 'start' && startEventsSet.clear();
    type === 'stop' && stopEventsSet.clear();
  };

  timerRecordMap.set('start', start);
  timerRecordMap.set('stop', stop);
  timerRecordMap.set('on', on);
  timerRecordMap.set('clearEvent', clearEvent);
  timerRecordMap.set('clearEventsOf', clearEventsOf);

  return timerRecordMap;
};
