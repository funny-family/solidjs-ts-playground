import { onMount } from 'solid-js';
import { createTime } from './time.composable';
import { withBaseEvents } from './with-base-events';

export var TimeSection = () => {
  var time = withBaseEvents(createTime());
  var formatTime = (date: Date) =>
    new Intl.DateTimeFormat('en-EN', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    }).format(date);

  onMount(() => {
    time.start();

    // time.eachTick(() => {
    //   console.log(1);
    // });

    time?.on?.('start', () => {
      console.log('started!');
    });

    time?.on?.('stop', () => {
      console.log('stopped!');
    });
  });

  return (
    <section>
      <h1>time:</h1>
      <div>
        <button
          type="button"
          onClick={() => {
            time.start();
          }}
        >
          start
        </button>
        <button
          type="button"
          onClick={() => {
            time.stop();
          }}
        >
          stop
        </button>
        <div>is running: {`${time.state() === 1}`}</div>
        <div>{formatTime(time.date())}</div>
      </div>
    </section>
  );
};
