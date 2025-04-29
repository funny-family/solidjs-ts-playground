import { createTimerSetup } from '../timer.composable';
import { Stopwatch } from './stopwatch';

export var setupStopwatch = createTimerSetup(() => new Stopwatch());
