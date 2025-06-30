import type {
  BaseEventListener,
  RecordMapEntry,
  WithResetEventRecord,
} from './types';
import { LISTENER_TYPE_SYMBOL } from '../utils';
import type { PluginFunction } from '../../types';
import type { DependentMap } from '../../../types';

export const RESET_EVENTS_SET_SYMBOL = Symbol('RESET_EVENTS_SET_SYMBOL');

export var withResetEvent: PluginFunction<RecordMapEntry> = (
  recordMap: DependentMap<RecordMapEntry>
) => {
  var resetEventsSet = new Set<VoidFunction>();

  var timer_reset = recordMap.get('reset')!;
  const reset: typeof timer_reset = () => {
    const value = timer_reset();

    // prettier-ignore
    return (
      value
      ?
      (
        resetEventsSet.forEach((listener) => {
          listener();
        }),
        value
      )
      :
      value
    )
  };

  var timer_on = recordMap.get('on')!;
  const on = ((type, listener: BaseEventListener) => {
    // prettier-ignore
    type === 'reset' && (
      listener[LISTENER_TYPE_SYMBOL] = 'reset',
      resetEventsSet.add(listener)
    );

    timer_on(type, listener);
  }) as WithResetEventRecord['on'];

  var timer_clearEvent = recordMap.get('clearEvent')!;
  const clearEvent = ((listener: BaseEventListener) => {
    timer_clearEvent(listener);

    // prettier-ignore
    listener[LISTENER_TYPE_SYMBOL] === 'reset' && (
      resetEventsSet.delete(listener)
    );
  }) as WithResetEventRecord['clearEvent'];

  var timer_clearEventsOf = recordMap.get('clearEventsOf')!;
  const clearEventsOf = ((type) => {
    timer_clearEventsOf(type);

    type === 'reset' && resetEventsSet.clear();
  }) as WithResetEventRecord['clearEventsOf'];

  recordMap.set('reset', reset);
  recordMap.set('on', on);
  recordMap.set('clearEvent', clearEvent);
  recordMap.set('clearEventsOf', clearEventsOf);
  recordMap.set(RESET_EVENTS_SET_SYMBOL, resetEventsSet);

  return recordMap;
};
