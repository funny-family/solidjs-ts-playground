import { createStopwatch } from './stopwatch.composable';

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
      <div>isRunning: {`${stopwatch.state() === 1}`}</div>
      <div>{stopwatch.milliseconds()}</div>
    </section>
  );
};
