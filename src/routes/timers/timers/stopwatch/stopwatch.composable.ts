import { createSignal } from 'solid-js';
import { Stopwatch } from './stopwatch';
import type {
  CreateStopwatchReturnRecord,
  SetupCreateStopwatch,
} from './stopwatch.composable.types';

export var setupCreateStopwatch: SetupCreateStopwatch = (predicate) => () => {
  var stopwatch = predicate();
  // @ts-ignore
  window.stopwatch1 = stopwatch;

  const millisecondsSignal = createSignal(stopwatch.milliseconds);

  const milliseconds = millisecondsSignal[0];
  var millisecondsSetter = millisecondsSignal[1];
  const _setMilliseconds =
    (
      stopwatch: Stopwatch,
      setter: typeof millisecondsSetter
    ): CreateStopwatchReturnRecord['setMilliseconds'] =>
    (predicate) => {
      stopwatch.milliseconds = predicate();

      setState(stopwatch.state);

      return setter(stopwatch.milliseconds);
    };
  const setMilliseconds = _setMilliseconds(stopwatch, millisecondsSetter);

  const stateSignal = createSignal(stopwatch.state);
  var state = stateSignal[0];
  var setState = stateSignal[1];

  stopwatch.eachTick(() => {
    setMilliseconds(() => stopwatch.milliseconds);
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
        setMilliseconds(() => stopwatch.milliseconds),
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
