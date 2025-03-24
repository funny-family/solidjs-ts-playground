import { createSignal } from 'solid-js';
import { Countdown } from './countdown';
import type {
  CreateCountdownReturnRecord,
  SetupCreateCountdown,
} from './countdown.composable.types';

export var setupCreateCountdown: SetupCreateCountdown = (predicate) => () => {
  var countdown = predicate();
  window.ctd = countdown;

  const stateSignal = createSignal(countdown.state);
  const state = stateSignal[0];
  var setState = stateSignal[1];

  const millisecondsSignal = createSignal(countdown.milliseconds);
  const milliseconds = millisecondsSignal[0];
  var millisecondsSetter = millisecondsSignal[1];
  const setMilliseconds: CreateCountdownReturnRecord['setMilliseconds'] = (
    predicate
  ) => {
    countdown.milliseconds = predicate(countdown.milliseconds);

    // console.log({ value, countdown });

    setState(countdown.state);

    return millisecondsSetter(countdown.milliseconds);
  };
  var setMillisecondsPredicate = () => countdown.milliseconds;

  countdown.eachTick(() => {
    setMilliseconds(setMillisecondsPredicate);
  });

  const start: CreateCountdownReturnRecord['start'] = () => {
    const result = countdown.start();

    // prettier-ignore
    return (
        result
        ?
        (
          setState(countdown.state),
          result
        )
        :
        result
      )
  };

  const stop: CreateCountdownReturnRecord['stop'] = () => {
    const result = countdown.stop();

    // prettier-ignore
    return (
        result
        ?
        (
          setState(countdown.state),
          result
        )
        :
        result
      )
  };

  const reset: CreateCountdownReturnRecord['reset'] = () => {
    const result = countdown.reset();

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

  const eachTick: CreateCountdownReturnRecord['eachTick'] = (callback) => {
    countdown.tickCallbacksSet.add(callback);
  };

  const clear: CreateCountdownReturnRecord['clear'] = () => {
    countdown.clear();
  };

  const clearEachTickCallbacks: CreateCountdownReturnRecord['clearEachTickCallbacks'] =
    () => {
      countdown.tickCallbacksSet.clear();
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

export var createCountdown = setupCreateCountdown(() => new Countdown());
