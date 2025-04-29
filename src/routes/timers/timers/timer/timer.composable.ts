import { createSignal } from 'solid-js';
import type {
  TimerRecord,
  CreateTimerSetup,
  TimerRecordEntry,
} from './timer.composable.types';
import type { DependentMapConstructor } from '../types';

export var createTimerSetup: CreateTimerSetup = (predicate) => () => {
  const recordMap = new (Map as DependentMapConstructor)<TimerRecordEntry>();

  var timer = predicate();

  const stateSignal = createSignal(timer.state);
  const state = stateSignal[0];
  var setState = stateSignal[1];

  const millisecondsSignal = createSignal(timer.milliseconds);
  const milliseconds = millisecondsSignal[0];
  var millisecondsSetter = millisecondsSignal[1];
  const setMilliseconds: TimerRecord['setMilliseconds'] = (predicate) => {
    timer.milliseconds = predicate(timer.milliseconds);

    setState(timer.state);

    return millisecondsSetter(timer.milliseconds);
  };
  var setMillisecondsPredicate = () => timer.milliseconds;

  timer.eachTick(() => {
    setMilliseconds(setMillisecondsPredicate);
  });

  const start: TimerRecord['start'] = () => {
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

  const stop: TimerRecord['stop'] = () => {
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

  const reset: TimerRecord['reset'] = () => {
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

  const eachTick: TimerRecord['eachTick'] = (callback) => {
    timer.tickCallbacksSet.add(callback);
  };

  const clear: TimerRecord['clear'] = () => {
    timer.clear();
  };

  const clearEachTickCallbacks: TimerRecord['clearEachTickCallbacks'] = () => {
    timer.tickCallbacksSet.clear();
  };

  recordMap.set('milliseconds', milliseconds);
  recordMap.set('setMilliseconds', setMilliseconds);
  recordMap.set('state', state);
  recordMap.set('start', start);
  recordMap.set('stop', stop);
  recordMap.set('reset', reset);
  recordMap.set('eachTick', eachTick);
  recordMap.set('clear', clear);
  recordMap.set('clearEachTickCallbacks', clearEachTickCallbacks);

  return recordMap;
};
