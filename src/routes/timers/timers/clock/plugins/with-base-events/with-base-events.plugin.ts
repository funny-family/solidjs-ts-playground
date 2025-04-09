import type { WithBaseEventsEntry, WithBaseEventsReturnRecord } from './types';
import { DependentMap } from '../../../types';
import type {
  SetupClockReturnRecord,
  SetupClockReturnRecordEntry,
} from '../../index';

export var withBaseEvents = <T extends SetupClockReturnRecordEntry>(
  returnRecordMap: T extends DependentMap<infer U>
    ? DependentMap<U>
    : DependentMap<SetupClockReturnRecordEntry | WithBaseEventsEntry>
) => {
  var startEventsSet = new Set<Function>();
  var stopEventsSet = new Set<Function>();

  var clock_start = returnRecordMap.get('start')!;
  const start: SetupClockReturnRecord['start'] = () => {
    const value = clock_start();

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

  var clock_stop = returnRecordMap.get('stop')!;
  const stop: SetupClockReturnRecord['stop'] = () => {
    const value = clock_stop();

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

  const on: WithBaseEventsReturnRecord['on'] = (type, listener) => {
    type === 'start' && startEventsSet.add(listener);
    type === 'stop' && stopEventsSet.add(listener);
  };

  const clearEvent: WithBaseEventsReturnRecord['clearEvent'] = (type) => {
    type === 'start' && startEventsSet.clear();
    type === 'stop' && stopEventsSet.clear();
  };

  returnRecordMap.set('start', start);
  returnRecordMap.set('stop', stop);
  returnRecordMap.set('on', on);
  returnRecordMap.set('clearEvent', clearEvent);

  return returnRecordMap;
};
