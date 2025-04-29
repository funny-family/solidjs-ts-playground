import { onCleanup, onMount } from 'solid-js';
import { setupClock } from './index';
import { isRunning, fromEntries } from '../utils';
import { withBaseEvents } from '../plugins/with-events';

var createClock = () => fromEntries(withBaseEvents(setupClock()));
// var createClock = () => fromEntries(setupClock());

var formatTime = (date: Date) =>
  new Intl.DateTimeFormat('en-EN', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  }).format(date);

var CurrentTime = () => {
  var clock = createClock();

  var startEvent = () => {
    console.log('started!');
  };

  var stopEvent = () => {
    console.log('stopped!');
  };

  onMount(() => {
    clock.start();

    // clock.eachTick(() => {
    //   console.log(1);
    // });

    clock?.on?.('start', startEvent);
    clock?.on?.('stop', stopEvent);
  });

  onCleanup(() => {
    clock?.clearEventsOf?.('start');
    clock?.clearEventsOf?.('stop');
  });

  return (
    <section>
      <h3>Current time</h3>

      <div>
        <button
          type="button"
          onClick={() => {
            clock.start();
          }}
        >
          start
        </button>

        <button
          type="button"
          onClick={() => {
            clock.stop();
          }}
        >
          stop
        </button>

        <div>
          <div>is running: {`${isRunning(clock.state())}`}</div>
          <div>{formatTime(clock.date())}</div>
        </div>
      </div>
    </section>
  );
};

var UTCPlus9Time = () => {
  var clock = createClock();

  var createDateTimeFormatter = () => {
    var dateTimeFormat = new Intl.DateTimeFormat('en-EN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Tokyo',
    });

    return (date: Date) => dateTimeFormat.format(date);
  };
  var formatDateTime = createDateTimeFormatter();

  onMount(() => {
    clock.eachTick(() => {
      // clock.date().setUTCHours(8);
      // console.log(clock.date());
    });

    clock.start();

    // console.log(111, { date: clock.date() });
  });

  return (
    <section>
      <h3>UTC +9 (Tokyo)</h3>

      <div>
        <button
          type="button"
          onClick={() => {
            clock.start();
          }}
        >
          start
        </button>

        <button
          type="button"
          onClick={() => {
            clock.stop();
          }}
        >
          stop
        </button>

        <div>
          <div>is running: {`${isRunning(clock.state())}`}</div>
          <div>{formatDateTime(clock.date())}</div>
        </div>
      </div>
    </section>
  );
};

export var ClockSection = () => {
  return (
    <section>
      <h1>Clock:</h1>

      <div style={{ border: '2px solid black' }}>
        <CurrentTime />
        <UTCPlus9Time />
      </div>
    </section>
  );
};
