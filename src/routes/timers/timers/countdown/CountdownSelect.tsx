import { onMount } from 'solid-js';
import { createCountdown } from './countdown.composable';
import { isRunning } from '../utils';

export var CountdownSection = () => {
  var countdown = createCountdown();
  window.countdown = countdown;

  // onMount(() => {
  //   countdown.start();

  //   // countdown.eachTick(() => {
  //   //   console.log(1);
  //   // });

  //   countdown?.on?.('start', () => {
  //     console.log('started!');
  //   });

  //   countdown?.on?.('stop', () => {
  //     console.log('stopped!');
  //   });
  // });

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
            onInput={(event) => {
              var value = (event.target as HTMLInputElement).value;

              countdown.setMilliseconds(() => {
                return Number(eval(value));
              });
            }}
          />
        </div>

        <div>is running: {`${isRunning(countdown.state())}`}</div>
        <div>{countdown.milliseconds()}</div>
      </div>
    </section>
  );
};
