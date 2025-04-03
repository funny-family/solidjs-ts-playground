import { TimeSection } from './timers/time/TimeSection';
import { ClockSection } from './timers/clock/ClockSection';
import { StopwatchSection } from './timers/stopwatch/StopwatchSection';
import { CountdownSection } from './timers/countdown/CountdownSelect';

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
