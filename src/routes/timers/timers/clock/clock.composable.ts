import { createSignal } from 'solid-js';
import { Clock } from './clock';
import type {
  SetupClockReturnRecord,
  CreateClockSetup,
  SetupClockReturnRecordEntry,
} from './clock.composable.types';
import type { DependentMapConstructor } from '../types';

export var createClockSetup: CreateClockSetup = (predicate) => () => {
  const returnRecordMap =
    new (Map as DependentMapConstructor)<SetupClockReturnRecordEntry>();

  var clock = predicate();

  var [state, setState] = createSignal(clock.state);
  var [date, setDate] = createSignal(clock.date, {
    equals: false,
  });

  clock.eachTick(() => {
    setDate(clock.date);
  });

  const start: SetupClockReturnRecord['start'] = () => {
    const value = clock.start();

    // prettier-ignore
    return (
      value
      ?
      (
        setState(clock.state),
        value
      )
      :
      value
    )
  };

  const stop: SetupClockReturnRecord['stop'] = () => {
    const value = clock.stop();

    // prettier-ignore
    return (
      value
      ?
      (
        setState(clock.state),
        value
      )
      :
      value
    )
  };

  const eachTick: SetupClockReturnRecord['eachTick'] = (callback) => {
    clock.tickCallbacksSet.add(callback);
  };

  const clear: SetupClockReturnRecord['clear'] = () => {
    clock.clear();
  };

  const clearEachTickCallbacks: SetupClockReturnRecord['clearEachTickCallbacks'] =
    () => {
      clock.tickCallbacksSet.clear();
    };

  returnRecordMap.set('state', state);
  returnRecordMap.set('date', date);
  returnRecordMap.set('start', start);
  returnRecordMap.set('stop', stop);
  returnRecordMap.set('eachTick', eachTick);
  returnRecordMap.set('clear', clear);
  returnRecordMap.set('clearEachTickCallbacks', clearEachTickCallbacks);

  return returnRecordMap;
};

export var setupClock = createClockSetup(() => new Clock());
