import { LISTENER_TYPE_SYMBOL } from '../utils';
import type {
  BaseEventListener,
  TimerBaseEventsEntry,
  WithBaseEventsRecord,
  WithBaseEventsRecordEntry,
} from './types';
import type { DependentMap, PluginFunction } from '../../../types';

export var withBaseEvents = ((
  recordMap: DependentMap<TimerBaseEventsEntry | WithBaseEventsRecordEntry>
) => {
  var startEventsSet = new Set<Function>();
  var stopEventsSet = new Set<Function>();

  var timer_start = recordMap.get('start')!;
  const start: typeof timer_start = () => {
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

  var timer_stop = recordMap.get('stop')!;
  const stop: typeof timer_stop = () => {
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

  const on = ((type, listener: BaseEventListener) => {
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
  }) as WithBaseEventsRecord['on'];

  const clearEvent = ((listener: BaseEventListener) => {
    const type = listener[LISTENER_TYPE_SYMBOL];

    type === 'start' && startEventsSet.delete(listener);
    type === 'start' && startEventsSet.delete(listener);
  }) as WithBaseEventsRecord['clearEvent'];

  const clearEventsOf: WithBaseEventsRecord['clearEventsOf'] = (type) => {
    type === 'start' && startEventsSet.clear();
    type === 'stop' && stopEventsSet.clear();
  };

  recordMap.set('start', start);
  recordMap.set('stop', stop);
  recordMap.set('on', on);
  recordMap.set('clearEvent', clearEvent);
  recordMap.set('clearEventsOf', clearEventsOf);

  return recordMap;
}) as PluginFunction<WithBaseEventsRecordEntry>;
