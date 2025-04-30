import { onCleanup, onMount } from 'solid-js';
import { formatTime, fromEntries, isRunning } from '../../utils';
import { elapsedHours, elapsedMinutes, elapsedSeconds } from '..';
import { setupCountdown } from '..';
import { withBaseEvents } from '../../plugins/with-events';
import { withResetEvent } from '../../plugins/with-events/with-reset-event/with-reset-event.plugin';

// var createCountdown = () => fromEntries(setupCountdown());
// var createCountdown = () => fromEntries(withBaseEvents(setupCountdown()));
var createCountdown = () =>
  fromEntries(withResetEvent(withBaseEvents(setupCountdown())));

// var createCountdown = () => fromEntries(withResetEvent(setupCountdown()));

export var CountdownSection = () => {
  var countdown = createCountdown();
  window.countdown = countdown;

  var start = () => {
    console.log('"countdown": started!');
  };

  var stop = () => {
    console.log('"countdown": stopped!');
  };

  var reset = () => {
    console.log('"countdown": reset!');
  };

  onMount(() => {
    // countdown.eachTick(() => {
    //   console.log(1);
    // });

    countdown?.on?.('start', start);
    countdown?.on?.('stop', stop);
    countdown?.on?.('reset', reset);
  });

  onCleanup(() => {
    countdown?.clearEventsOf?.('start');
    countdown?.clearEventsOf?.('stop');
    countdown?.clearEventsOf?.('reset');
  });

  var onMsSet = (event: Event) => {
    var value = (event.target as HTMLInputElement).value;

    countdown.setMilliseconds(() => {
      return Number(eval(value));
    });
  };

  return (
    <section>
      <h1>countdown:</h1>
      <div>
        <button
          type="button"
          onClick={() => {
            countdown.start();
          }}
        >
          start
        </button>

        <button
          type="button"
          onClick={() => {
            countdown.stop();
          }}
        >
          stop
        </button>

        <button
          type="button"
          onClick={() => {
            countdown.reset();
          }}
        >
          reset
        </button>

        <div>
          <input
            type="text"
            onInput={(event) => onMsSet(event)}
            onBlur={(event) => onMsSet(event)}
          />
        </div>

        <div>state: {countdown.state()}</div>
        <div>is running: {`${isRunning(countdown.state())}`}</div>
        <div>{countdown.milliseconds()}</div>

        <div>
          <span>{formatTime(elapsedHours(countdown.milliseconds()))}</span>:
          <span>{formatTime(elapsedMinutes(countdown.milliseconds()))}</span>:
          <span>{formatTime(elapsedSeconds(countdown.milliseconds()))}</span>:
          <span>{formatTime(countdown.milliseconds())}</span>
        </div>
      </div>
    </section>
  );
};
