import {
  For,
  onMount,
  type JSX,
  createEffect,
  createRenderEffect,
  createSignal,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { insert } from 'solid-js/web';
import { ReactiveMap } from '~/utils/reactive-map';

// https://gist.github.com/tizmagik/19ba6516064a046a37aff57c7c65c9cd
// https://stackoverflow.com/questions/30921283/how-to-get-a-last-element-of-es6-map-without-iterations

const MapRender = () => {
  let listRef: HTMLUListElement | null = null;
  let mapContainerRef: HTMLUListElement | null = null;

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

    namesMap.forEach((value, key) => {
      insert(mapContainerRef as Element, () => (
        <li data-key={key}>
          <div>name: {value.name}</div>
          <div>age: {value.age}</div>
        </li>
      ));
    });
  });

  onMount(() => {
    // namesMap.forEach((value, key) => {
    //   listRef!.appendChild(
    //     (
    //       <li data-key={key}>
    //         <div>name: {value.name}</div>
    //         <div>age: {value.age}</div>
    //       </li>
    //     ) as Node
    //   );
    // });
  });

  return (
    <div>
      <ul ref={mapContainerRef} />
      <button
        type="button"
        onClick={() => {
          namesMap.set(1, {
            name: 'Robert)',
            age: 69,
          });
        }}
      >
        change 1
      </button>
    </div>
  );
};

export default MapRender;
