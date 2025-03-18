import { createSignal } from 'solid-js';
import { Time } from './time';
import type {
  CreateTimeReturnRecord,
  SetupCreateTime,
} from './time.composable.types';

export var setupCreateTime: SetupCreateTime = (predicate) => () => {
  var time = predicate();

  var [state, setState] = createSignal(time.state);
  var [date, setDate] = createSignal(time.date, {
    equals: false,
  });

  time.eachTick(() => {
    setDate(time.date);
  });

  const start: CreateTimeReturnRecord['start'] = () => {
    const result = time.start();

    // prettier-ignore
    return (
      result
      ?
      (
        setState(time.state),
        result
      )
      :
      result
    )
  };

  const stop: CreateTimeReturnRecord['stop'] = () => {
    const result = time.stop();

    // prettier-ignore
    return (
      result
      ?
      (
        setState(time.state),
        result
      )
      :
      result
    )
  };

  const eachTick: CreateTimeReturnRecord['eachTick'] = (callback) => {
    time.tickCallbacksSet.add(callback);
  };

  const clear: CreateTimeReturnRecord['clear'] = () => {
    time.clear();
  };

  const clearEachTickCallbacks: CreateTimeReturnRecord['clearEachTickCallbacks'] =
    () => {
      time.tickCallbacksSet.clear();
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

export var createTime = setupCreateTime(() => new Time());
