import { onMount } from 'solid-js';
import { setupClock, type SetupClockReturnRecord } from './index';
import {
  withBaseEvents,
  type WithBaseEventsReturnRecord,
} from './plugins/with-base-events';
import { isRunning, transformEntries } from '../utils';

// var createClock = () =>
//   transformEntries<SetupClockReturnRecord & WithBaseEventsReturnRecord>(
//     withBaseEvents(setupClock())
//   );

var f = <T extends any>(a: T) => {
  return a;
};

var createClock1 = f(setupClock());
var createClock2 = withBaseEvents(setupClock());
var createClock3 = setupClock();
var on = createClock2.get('on');
var clearEvent = createClock2.get('clearEvent');

var formatTime = (date: Date) =>
  new Intl.DateTimeFormat('en-EN', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  }).format(date);

var CurrentTime = () => {
  var clock = createClock();

  onMount(() => {
    clock.start();

    // clock.eachTick(() => {
    //   console.log(1);
    // });

    clock?.on?.('start', () => {
      console.log('started!');
    });

    clock?.on?.('stop', () => {
      console.log('stopped!');
    });
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
