import { createSignal } from 'solid-js';
import { Clock } from './clock';
import type {
  ClockRecord,
  CreateClockSetup,
  ClockRecordEntry,
} from './clock.composable.types';
import type { DependentMapConstructor } from '../types';

export var createClockSetup: CreateClockSetup = (predicate) => () => {
  const recordMap = new (Map as DependentMapConstructor)<ClockRecordEntry>();

  var clock = predicate();

  var [state, setState] = createSignal(clock.state);
  var [date, setDate] = createSignal(clock.date, {
    equals: false,
  });

  clock.eachTick(() => {
    setDate(clock.date);
  });

  const start: ClockRecord['start'] = () => {
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

  const stop: ClockRecord['stop'] = () => {
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

  const eachTick: ClockRecord['eachTick'] = (callback) => {
    clock.tickCallbacksSet.add(callback);
  };

  const clear: ClockRecord['clear'] = () => {
    clock.clear();
  };

  const clearEachTickCallbacks: ClockRecord['clearEachTickCallbacks'] = () => {
    clock.tickCallbacksSet.clear();
  };

  recordMap.set('state', state);
  recordMap.set('date', date);
  recordMap.set('start', start);
  recordMap.set('stop', stop);
  recordMap.set('eachTick', eachTick);
  recordMap.set('clear', clear);
  recordMap.set('clearEachTickCallbacks', clearEachTickCallbacks);

  return recordMap;
};

export var setupClock = createClockSetup(() => new Clock());
