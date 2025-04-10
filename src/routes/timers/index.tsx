import { TimeSection } from './timers/time/TimeSection';
import { ClockSection } from './timers/clock/ClockSection';
import { StopwatchSection } from './timers/timer/stopwatch/StopwatchSection';
import { CountdownSection } from './timers/timer/countdown/CountdownSelect';

export default () => {
  // let requestID = 0;
  // const eachTick = () => {
  //   console.log('running');

  //   requestID = requestAnimationFrame(eachTick);
  // };

  // requestID = requestAnimationFrame(eachTick);
  // window.requestID = requestID;

  return (
    <main>
      <ClockSection />

      <hr />

      <StopwatchSection />

      <hr />

      <CountdownSection />
    </main>
  );
};
