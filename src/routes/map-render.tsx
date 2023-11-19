import {
  For,
  onMount,
  type JSX,
  createEffect,
  createRenderEffect,
  createSignal,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { ReactiveMap } from '~/utils/reactive-map';

// https://gist.github.com/tizmagik/19ba6516064a046a37aff57c7c65c9cd
// https://stackoverflow.com/questions/30921283/how-to-get-a-last-element-of-es6-map-without-iterations

const MapRender = () => {
  let listRef: HTMLUListElement | null = null;

  const namesMap = new ReactiveMap([
    [
      0,
      {
        name: 'James',
        age: 34,
      },
    ],
    [
      1,
      {
        name: 'Robert',
        age: 12,
      },
    ],
    [
      2,
      {
        name: 'John',
        age: 43,
      },
    ],
    [
      3,
      {
        name: 'Michael',
        age: 92,
      },
    ],
  ]);
  window.namesMap = namesMap;

  // const namesMapNodes = Array<JSX.Element>(namesMap.size);
  // namesMap.forEach((value, key) => {
  //   namesMapNodes.push(
  //     <li data-key={key}>
  //       <div>name: {value.name}</div>
  //       <div>age: {value.age}</div>
  //     </li>
  //   );
  // });

  // const [namesMap_get, namesMap_set] = createStore(Array.from(namesMap));
  createEffect(() => {
    // namesMap_set(Array.from(namesMap));
    console.log(111, namesMap);
  });

  onMount(() => {
    namesMap.forEach((value, key) => {
      listRef!.appendChild(
        (
          <li data-key={key}>
            <div>name: {value.name}</div>
            <div>age: {value.age}</div>
          </li>
        ) as Node
      );
    });
  });

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          const key = namesMap.size + 1;
          const value = {
            name: crypto.randomUUID(),
            age: Math.random() * (100 - 10) + 10,
          };
          namesMap.set(key, value);
        }}
      >
        add random
      </button>

      <div>
        <div>as array:</div>
        {/* <ul>{namesMapNodes}</ul> */}
      </div>

      <div>
        <div>as for:</div>
        <ul>
          <For each={Array.from(namesMap)}>
            {(key, value) => {
              // console.log(key, value);

              return <div>{JSON.stringify(value())}</div>;
            }}
          </For>
        </ul>
      </div>

      <div>
        <div>as native:</div>
        <ul ref={listRef} />
      </div>

      {/* <div>
        <div>as for (array):</div>
        <ul>
          <For each={namesMap_get()}>
            {({ 0: key, 1: value }) => {
              return (
                <li>
                  <div>name: {value.name}</div>
                  <div>age: {value.age}</div>
                </li>
              );
            }}
          </For>
        </ul>
      </div> */}

      <div>
        <div>last element:</div>
        <div>
          {() => {
            // const lastEl = namesMap.get(namesMap.size - 1)!;
            // const lastEl = Array.from(namesMap.values()).pop()!;
            const lastEl = Array.from(namesMap)[namesMap.size - 1][1];
            // console.log(lastEl);

            // console.log(Array.from(namesMap.values()).pop(), namesMap);

            return (
              <div>
                <div>name: {lastEl?.name || ''}</div>
                <div>age: {lastEl?.age || 1}</div>
              </div>
            );
          }}
        </div>
      </div>
    </div>
  );
};

export default MapRender;
