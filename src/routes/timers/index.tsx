import { TimeSection } from './timers/time/TimeSection';
import { StopwatchSection } from './timers/stopwatch/StopwatchSection';

export default () => {
  return (
    <main>
      <TimeSection />

      <hr />

      <StopwatchSection />

      <hr />

      <section>
        <h1>timer:</h1>
        <div>1</div>
      </section>
    </main>
  );
};
