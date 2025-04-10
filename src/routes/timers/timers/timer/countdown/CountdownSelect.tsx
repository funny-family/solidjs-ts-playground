import { onMount } from 'solid-js';
import { formatTime, isRunning } from '../../utils';
import { elapsedHours, elapsedMinutes, elapsedSeconds } from '..';
import { createCountdown } from '..';

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
