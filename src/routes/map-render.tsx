import { ReactiveMap } from '@solid-primitives/map';
import { For, mapArray, type JSX } from 'solid-js';
import { innerHTML, insert } from 'solid-js/web';

var MapRender = () => {
  var testMap = new ReactiveMap();
  testMap.set('a', 1);
  testMap.set('b', 2);
  testMap.set('c', 3);
  testMap.set('d', 4);
  testMap.set('f', 5);
  window.testMap = testMap;

  var get_testMap = () => {
    return Object.fromEntries(testMap);
  };

  // var testMapMapped = mapArray([], () => {
  //   return
  // })

  var renderMap = <TMap extends ReactiveMap<any, any>>(
    map: TMap,
    callback: (value: any, key: any, map: TMap) => JSX.Element
  ) => {
    //
  };

  console.log(
    renderMap(testMap, () => {
      return 1;
    })
  );

  return (
    <main>
      <h1>test</h1>
      {/* <div
        ref={(element) => {
          insert(element, () => {
            return 1;
          });
        }}
      /> */}
      <ul>
        <For each={get_testMap()}>
          {(entry) => {
            return <li>{entry[0]}</li>;
          }}
        </For>
      </ul>
    </main>
  );
};

export default MapRender;
