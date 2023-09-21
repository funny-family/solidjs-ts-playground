import { createUniqueId, onMount } from 'solid-js';
import { Title } from 'solid-start';
import type { NodeRef } from '~/@types';
import { Counter } from '~/components/counter/counter.component';
import { TextField } from '~/components/text-field/text-field.component';
import { useNames } from '~/store/names.store';

export default function Home() {
  let h1Ref: NodeRef<HTMLHeadingElement> = undefined;
  let counterRef: NodeRef<HTMLDivElement> = undefined;

  const { name, changeNameToMax } = useNames();

  onMount(() => {
    console.log('h1Ref:', { h1Ref }, h1Ref);
    console.log('counterRef:', { counterRef }, counterRef);
  });

  const onCounterClick: Parameters<typeof Counter>[0]['onClick'] = (event) => {
    console.log('onCounterClick:', event);
  };

  return (
    <main>
      <div>
        <Title>Hello World</Title>
        <div>
          <input
            type="text"
            innerHTML="<div>THIS IS DIV!</div>"
            children={<div>123</div>}
          />
          <TextField
            label={{
              children: 'This is label',
              // inputMode: '3453453',
              // innerHTML: '<div>THIS IS DIV!</div>'
              // innerText: '1231321321'
              // textContent: '12313fff1321'
            }}
            input={{
              id: createUniqueId(),
              type: 'tel',
              class: 'TextField',
              // src: '7465hdig'
              // children: 'gjgughdgud',
            }}
            // contentEditable
            // contenteditable
          />
        </div>
        <h1 ref={h1Ref}>Hello world!</h1>
        <button type="button" onClick={() => changeNameToMax()}>
          Name is: {name()}
        </button>
        <Counter
          class="tttttt"
          id={/* @once */ createUniqueId()}
          min={1}
          max={4}
          initialValue={2}
          ref={counterRef}
          aria-label="counter"
          onClick={(event) => onCounterClick(event)}
        >
          {({ DecrementButton, IncrementButton, Count }) => (
            <div style={{ 'display': 'flex', 'flex-direction': 'column' }}>
              <DecrementButton aria-label="decrement-button" />
              <Count aria-label="count" />
              <IncrementButton aria-label="increment-button" />
            </div>
          )}
        </Counter>
      </div>
    </main>
  );
}
