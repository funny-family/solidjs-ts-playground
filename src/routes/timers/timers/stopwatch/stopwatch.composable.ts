import { createSignal } from 'solid-js';
import { Stopwatch } from './stopwatch';
import type {
  CreateStopwatchReturnRecord,
  SetupCreateStopwatch,
} from './stopwatch.composable.types';

export var setupCreateStopwatch: SetupCreateStopwatch = (predicate) => () => {
  var stopwatch = predicate();
  window.sw = stopwatch;

  const stateSignal = createSignal(stopwatch.state);
  const state = stateSignal[0];
  var setState = stateSignal[1];

  const millisecondsSignal = createSignal(stopwatch.milliseconds);
  const milliseconds = millisecondsSignal[0];
  var millisecondsSetter = millisecondsSignal[1];
  const setMilliseconds: CreateStopwatchReturnRecord['setMilliseconds'] = (
    predicate
  ) => {
    stopwatch.milliseconds = predicate(stopwatch.milliseconds);

    setState(stopwatch.state);

    return millisecondsSetter(stopwatch.milliseconds);
  };
  var setMillisecondsPredicate = () => stopwatch.milliseconds;

  stopwatch.eachTick(() => {
    setMilliseconds(setMillisecondsPredicate);
  });

  const start: CreateStopwatchReturnRecord['start'] = () => {
    const result = stopwatch.start();

    // prettier-ignore
    return (
      result
      ?
      (
        setState(stopwatch.state),
        result
      )
      :
      result
    )
  };

  const stop: CreateStopwatchReturnRecord['stop'] = () => {
    const result = stopwatch.stop();

    // prettier-ignore
    return (
      result
      ?
      (
        setState(stopwatch.state),
        result
      )
      :
      result
    )
  };

  const reset: CreateStopwatchReturnRecord['reset'] = () => {
    const result = stopwatch.reset();

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

  const eachTick: CreateStopwatchReturnRecord['eachTick'] = (callback) => {
    stopwatch.tickCallbacksSet.add(callback);
  };

  const clear: CreateStopwatchReturnRecord['clear'] = () => {
    stopwatch.clear();
  };

  const clearEachTickCallbacks: CreateStopwatchReturnRecord['clearEachTickCallbacks'] =
    () => {
      stopwatch.tickCallbacksSet.clear();
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

export var createStopwatch = setupCreateStopwatch(() => new Stopwatch());
