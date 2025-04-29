import { createTimerSetup } from '../timer.composable';
import { Countdown } from './countdown';

export var setupCountdown = createTimerSetup(() => new Countdown());
