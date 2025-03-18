import { createSignal } from 'solid-js';
import { Time } from './time';
import type { CreateTime, SetupCreateTime } from './time.composable.types';

export var setupCreateTime: SetupCreateTime = (predicate) => () => {
  var time = predicate();
  window.time = time;
  var [state, setState] = createSignal(time.state);
  var [date, setDate] = createSignal(time.date, {
    equals: false,
  });

  time.eachTick(() => {
    setDate(time.date);
  });

  const start: CreateTime['start'] = () => {
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

  const stop: CreateTime['stop'] = () => {
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

  const eachTick: CreateTime['eachTick'] = (callback) => {
    time.tickCallbacksSet.add(callback);
  };

  const clear: CreateTime['clear'] = () => {
    time.clear();
  };

  const clearEachTickCallbacks: CreateTime['clearEachTickCallbacks'] = () => {
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
