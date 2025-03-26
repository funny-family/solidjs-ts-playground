import { setupCreateTimer } from '../timer.composable';
import { Stopwatch } from './stopwatch';

export var createStopwatch = setupCreateTimer(() => new Stopwatch());
