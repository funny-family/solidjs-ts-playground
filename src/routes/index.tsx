import { createUniqueId, onMount, Ref } from 'solid-js';
import { Title } from 'solid-start';
import type { NodeRef } from '~/@types';
import { Counter } from '~/components/counter/Counter';
import { TextField } from '~/components/text-field/text-field.component';

export default function Home() {
  let h1Ref: NodeRef<HTMLHeadingElement> = undefined;
  let counterRef: NodeRef<HTMLDivElement> = undefined;

  onMount(() => {
    console.log('h1Ref:', { h1Ref }, h1Ref);
    console.log('counterRef:', { counterRef }, counterRef);
  });

  const onCounterClick: Parameters<typeof Counter>[0]['onClick'] = (event) => {
    console.log('onCounterClick:', event);
  };

  return (
    <main>
      <Title>Hello World</Title>
      <div>
        <TextField
          label="Label"
          forwardProps={{
            id: createUniqueId(),
            type: 'number',
            class: 'TextField',
          }}
        />
      </div>
      <h1 ref={h1Ref}>Hello world!</h1>
      <Counter
        class="tttttt"
        id={createUniqueId()}
        // min={-2}
        // max={2}
        initialValue={1}
        ref={counterRef}
        aria-label="counter"
        onClick={(event) => onCounterClick(event)}
        // children={({ DecrementButton, IncrementButton, Count }) => (
        //   <div style={{ 'display': 'flex', 'flex-direction': 'column' }}>
        //     <DecrementButton aria-label="decrement-button" />
        //     <Count aria-label="count" />
        //     <IncrementButton aria-label="increment-button" />
        //   </div>
        // )}
      >
        {({ DecrementButton, IncrementButton, Count }) => (
          <div style={{ 'display': 'flex', 'flex-direction': 'column' }}>
            <DecrementButton aria-label="decrement-button" />
            <Count aria-label="count" />
            <IncrementButton aria-label="increment-button" />
          </div>
        )}
      </Counter>
      <p>
        Visit{' '}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{' '}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
