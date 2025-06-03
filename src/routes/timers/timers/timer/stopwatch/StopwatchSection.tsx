import { elapsedHours, elapsedMinutes, elapsedSeconds } from '../index';
import { formatTime, fromEntries, isRunning } from '../../utils';
import { setupStopwatch } from './stopwatch.composable';
import { withBaseEvents } from '../../plugins/with-events';
import { For, onCleanup, onMount, Show } from 'solid-js';
import { withResetEvent } from '../../plugins/with-events/with-reset-event/with-reset-event.plugin';
import { withLaps } from '../plugins/with-laps/with-laps.plugin';

// var createStopwatch = () => fromEntries(setupStopwatch());
// var createStopwatch = () => fromEntries(withBaseEvents(setupStopwatch()));
// var createStopwatch = () =>
//   fromEntries(withResetEvent(withBaseEvents(setupStopwatch())));

var createStopwatch = () =>
  fromEntries(withLaps(withResetEvent(withBaseEvents(setupStopwatch()))));

export const StopwatchSection = () => {
  var stopwatch = createStopwatch();
  window.stopwatch = stopwatch;

  var start = () => {
    console.log('"stopwatch": started!');
  };

  var stop = () => {
    console.log('"stopwatch": stopped!');
  };

  var reset = () => {
    console.log('"stopwatch": reset!');
  };

  onMount(() => {
    // stopwatch.eachTick(() => {
    //   console.log(1);
    // });

    stopwatch?.on?.('start', start);
    stopwatch?.on?.('stop', stop);
    stopwatch?.on?.('reset', reset);
  });

  onCleanup(() => {
    stopwatch?.clearEventsOf?.('start');
    stopwatch?.clearEventsOf?.('stop');
    stopwatch?.clearEventsOf?.('reset');
  });

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

      <div>
        <div>
          <button
            type="button"
            onClick={() => {
              stopwatch.addLap();
            }}
          >
            add lap
          </button>

          <button
            type="button"
            onClick={() => {
              stopwatch.clearLaps();
            }}
          >
            clear laps
          </button>
        </div>

        <div>
          <For each={stopwatch.laps()}>
            {(lap) => {
              return (
                <div>
                  <span>{`${lap}`}</span>
                  <button
                    type="button"
                    onClick={() => {
                      stopwatch.deleteLap(lap);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            }}
          </For>
        </div>
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
