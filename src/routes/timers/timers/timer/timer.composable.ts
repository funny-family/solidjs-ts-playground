import { createSignal } from 'solid-js';
import type {
  CreateTimerReturnRecord,
  SetupCreateTimer,
} from './timer.composable.types';

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

    setState(timer.state);

    return millisecondsSetter(timer.milliseconds);
  };
  var setMillisecondsPredicate = () => timer.milliseconds;

  timer.eachTick(() => {
    setMilliseconds(setMillisecondsPredicate);
  });

  const start: CreateTimerReturnRecord['start'] = () => {
    const value = timer.start();

    // prettier-ignore
    return (
        value
        ?
        (
          setState(timer.state),
          value
        )
        :
        value
      )
  };

  const stop: CreateTimerReturnRecord['stop'] = () => {
    const value = timer.stop();

    // prettier-ignore
    return (
        value
        ?
        (
          setState(timer.state),
          value
        )
        :
        value
      )
  };

  const reset: CreateTimerReturnRecord['reset'] = () => {
    const value = timer.reset();

    // prettier-ignore
    return (
        value
        ?
        (
          setMilliseconds(setMillisecondsPredicate),
          value
        )
        :
        value
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
