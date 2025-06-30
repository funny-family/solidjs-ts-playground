import type {
  BaseEventListener,
  RecordMapEntry,
  WithBaseEventsRecord,
} from './types';
import { LISTENER_TYPE_SYMBOL } from '../utils';
import type { PluginFunction } from '../../types';
import type { DependentMap } from '../../../types';

export const START_EVENTS_SET_SYMBOL = Symbol('START_EVENTS_SET_SYMBOL');
export const STOP_EVENTS_SET_SYMBOL = Symbol('STOP_EVENTS_SET_SYMBOL');

export var withBaseEvents: PluginFunction<RecordMapEntry> = (
  recordMap: DependentMap<RecordMapEntry>
) => {
  var startEventsSet = new Set<VoidFunction>();
  var stopEventsSet = new Set<VoidFunction>();

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
  recordMap.set(START_EVENTS_SET_SYMBOL, startEventsSet);
  recordMap.set(STOP_EVENTS_SET_SYMBOL, stopEventsSet);

  return recordMap;
};
