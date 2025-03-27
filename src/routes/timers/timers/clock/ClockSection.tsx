import { onMount } from 'solid-js';
import { createClock } from './clock.composable';
import { withBaseEvents } from './with-base-events';
import { isRunning } from '../utils';

var formatTime = (date: Date) =>
  new Intl.DateTimeFormat('en-EN', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  }).format(date);

var CurrentTime = () => {
  var clock = withBaseEvents(createClock());

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

var UTCMinus2Time = () => {
  var clock = createClock();

  onMount(() => {
    clock.eachTick(() => {
      // clock.date().setUTCHours(8);
      // console.log(clock.date());
    });

    clock.start();
  });

  return (
    <section>
      <h3>UTC -2</h3>

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

export var ClockSection = () => {
  return (
    <section>
      <h1>Clock:</h1>

      <div style={{ border: '2px solid black' }}>
        <CurrentTime />
        <UTCMinus2Time />
      </div>
    </section>
  );
};
