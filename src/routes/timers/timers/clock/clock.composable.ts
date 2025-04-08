import { createSignal } from 'solid-js';
import { Clock } from './clock';
import type {
  CreateClockReturnRecord,
  SetupCreateClock,
} from './clock.composable.types';

export var setupCreateClock: SetupCreateClock = (predicate) => () => {
  var clock = predicate();

  var [state, setState] = createSignal(clock.state);
  var [date, setDate] = createSignal(clock.date, {
    equals: false,
  });

  clock.eachTick(() => {
    setDate(clock.date);
  });

  const start: CreateClockReturnRecord['start'] = () => {
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

  const stop: CreateClockReturnRecord['stop'] = () => {
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

  const eachTick: CreateClockReturnRecord['eachTick'] = (callback) => {
    clock.tickCallbacksSet.add(callback);
  };

  const clear: CreateClockReturnRecord['clear'] = () => {
    clock.clear();
  };

  const clearEachTickCallbacks: CreateClockReturnRecord['clearEachTickCallbacks'] =
    () => {
      clock.tickCallbacksSet.clear();
    };

  return {
    state,
    date,
    start,
    stop,
    eachTick,
    clear,
    clearEachTickCallbacks,
  };
};

export var createClock = setupCreateClock(() => new Clock());
