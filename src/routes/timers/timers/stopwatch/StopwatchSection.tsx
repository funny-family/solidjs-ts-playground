import {
  createStopwatch,
  elapsedHours,
  elapsedMinutes,
  elapsedSeconds,
} from '../timer';
import { formatTime, isRunning } from '../utils';

export const StopwatchSection = () => {
  var stopwatch = createStopwatch();
  window.stopwatch = stopwatch;

  return (
    <section>
      <h1>stopwatch:</h1>
      <div>
        <button
          type="button"
          onClick={() => {
            stopwatch.start();
          }}
        >
          start
        </button>
        <button
          type="button"
          onClick={() => {
            stopwatch.stop();
          }}
        >
          stop
        </button>
        <button
          type="button"
          onClick={() => {
            stopwatch.reset();
          }}
        >
          reset
        </button>
      </div>
      <div>state: {stopwatch.state()}</div>
      <div>isRunning: {`${isRunning(stopwatch.state())}`}</div>
      <div>{stopwatch.milliseconds()}</div>
      <div>
        <span>{formatTime(elapsedHours(stopwatch.milliseconds()))}</span>:
        <span>{formatTime(elapsedMinutes(stopwatch.milliseconds()))}</span>:
        <span>{formatTime(elapsedSeconds(stopwatch.milliseconds()))}</span>:
        <span>{formatTime(stopwatch.milliseconds())}</span>
      </div>
    </section>
  );
};
