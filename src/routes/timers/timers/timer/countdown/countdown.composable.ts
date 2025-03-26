import { setupCreateTimer } from '../timer.composable';
import { Countdown } from './countdown';

export var createCountdown = setupCreateTimer(() => new Countdown());
