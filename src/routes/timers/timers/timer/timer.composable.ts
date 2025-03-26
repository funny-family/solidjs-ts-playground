import { createSignal } from 'solid-js';
import type { CreateTimerReturnRecord, SetupCreateTimer } from './timer.composable.types';

export var setupCreateTimer: SetupCreateTimer = (predicate) => () => {
  var timer = predicate();

  const stateSignal = createSignal(timer.state);
  const state = stateSignal[0];
  var setState = stateSignal[1];

  const millisecondsSignal = createSignal(timer.milliseconds);
  const milliseconds = millisecondsSignal[0];
  var millisecondsSetter = millisecondsSignal[1];
  const setMilliseconds: CreateTimerReturnRecord['setMilliseconds'] = (
    predicate
  ) => {
    timer.milliseconds = predicate(timer.milliseconds);

    // console.log({ value, timer });

    setState(timer.state);

    return millisecondsSetter(timer.milliseconds);
  };
  var setMillisecondsPredicate = () => timer.milliseconds;

  timer.eachTick(() => {
    setMilliseconds(setMillisecondsPredicate);
  });

  const start: CreateTimerReturnRecord['start'] = () => {
    const result = timer.start();

    // prettier-ignore
    return (
        result
        ?
        (
          setState(timer.state),
          result
        )
        :
        result
      )
  };

  const stop: CreateTimerReturnRecord['stop'] = () => {
    const result = timer.stop();

    // prettier-ignore
    return (
        result
        ?
        (
          setState(timer.state),
          result
        )
        :
        result
      )
  };

  const reset: CreateTimerReturnRecord['reset'] = () => {
    const result = timer.reset();

    // prettier-ignore
    return (
        result
        ?
        (
          setMilliseconds(setMillisecondsPredicate),
          result
        )
        :
        result
      )
  };

  const eachTick: CreateTimerReturnRecord['eachTick'] = (callback) => {
    timer.tickCallbacksSet.add(callback);
  };

  const clear: CreateTimerReturnRecord['clear'] = () => {
    timer.clear();
  };

  const clearEachTickCallbacks: CreateTimerReturnRecord['clearEachTickCallbacks'] =
    () => {
      timer.tickCallbacksSet.clear();
    };

  return {
    milliseconds,
    setMilliseconds,
    state,
    start,
    stop,
    reset,
    eachTick,
    clear,
    clearEachTickCallbacks,
  };
};
