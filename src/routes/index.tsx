import { createUniqueId, onMount, Ref } from 'solid-js';
import { Title } from 'solid-start';
import type { NodeRef } from '~/@types';
import { Counter } from '~/components/counter/Counter';
// import type {  } from '~/components/Counter';

type TypeWithGeneric<T> = T[];
type ExtractGeneric<Type> = Type extends TypeWithGeneric<infer X> ? X : never;

type Extracted = ExtractGeneric<TypeWithGeneric<number>>;

export default function Home() {
  let h1Ref: NodeRef<HTMLHeadingElement> = undefined;
  let counterRef: NodeRef<any> = undefined;

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
      <h1 ref={h1Ref}>Hello world!</h1>
      <Counter
        class="tttttt"
        id={createUniqueId()}
        min={-2}
        max={2}
        initialValue={1}
        ref={counterRef}
        aria-label="counter"
        onClick={onCounterClick}
      />
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
