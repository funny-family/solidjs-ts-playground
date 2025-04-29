import type { DependentMap, PluginFunction } from '../../../types';
import { LISTENER_TYPE_SYMBOL } from '../utils';

import type {
  BaseEventListener,
  WithResetEventEntry,
  WithResetEventRecord,
  WithResetEventRecordEntry,
} from './types';

export var withResetEvent = ((
  recordMap: DependentMap<WithResetEventEntry | WithResetEventRecordEntry>
) => {
  var resetEventsSet = new Set<Function>();

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

    const type = listener[LISTENER_TYPE_SYMBOL];

    type === 'reset' && resetEventsSet.delete(listener);
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

  return recordMap;
}) as PluginFunction<WithResetEventRecordEntry>;
