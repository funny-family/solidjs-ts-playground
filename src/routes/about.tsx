import { createSign } from 'crypto';
import {
  Index,
  type Component,
  type JSX,
  For,
  mapArray,
  createSignal,
  onMount,
} from 'solid-js';
import { createMutable, createStore } from 'solid-js/store';
import { useNames } from '~/store/names.store';

type AboutAttrs = JSX.CustomAttributes<HTMLDivElement>;
type AboutProps = {};
type AboutAttrsAndProps = AboutAttrs & AboutProps;

type AboutComponent = Component<AboutAttrsAndProps>;

const About: AboutComponent = (attrsAndProps) => {
  const { name, changeNameToSally } = useNames();

  let listRef: HTMLUListElement | null = null;

  const namesMap = new Map([
    [0, 'James'],
    [1, 'Robert'],
    [2, 'John'],
    [3, 'Michael'],
  ]);

  const namesMapNodes = Array<JSX.Element>(namesMap.size);
  const namesMapNodes_mutable = createMutable(
    Array<JSX.Element>(namesMap.size)
  );

  onMount(() => {
    namesMap.forEach((value, key, map) => {
      // namesMapNodes.push(<li>{value}</li>);
      // namesMapNodes_mutable.push(<li>{value}</li>);
      listRef!.appendChild((<li>{value}</li>) as Node);
    });
  });

  window.namesMap = namesMap;

  // const [namesMapAs_signal_get, namesMapAs_signal_set] = createSignal(
  //   namesMap,
  //   {
  //     equals: false,
  //   }
  // );

  // const mutableNamesMap = createMutable(Array.from(namesMap));
  // const [getNamesMap, setNamesMap] = createSignal(Array.from(namesMap));

  return (
    <div
      $ServerOnly={attrsAndProps.$ServerOnly}
      classList={attrsAndProps.classList}
      ref={attrsAndProps.ref}
    >
      <main>
        <h1>This is about page!</h1>

        <button
          type="button"
          onClick={() => {
            // var v = crypto.randomUUID();
            // var ms = namesMap.size;
            // namesMap.set(ms, v);
            // // setNamesMap(namesMap.size, [namesMap.get(ms - 1), v]);
            // // setNamesMap(Array.from(namesMap));
            // mutableNamesMap[ms - 1] = [ms - 1, v];
            console.log(listRef);

            const key = namesMap.size + 1;
            const value = crypto.randomUUID();
            namesMap.set(key + 1, value);
            listRef!.appendChild((<li>{value}</li>) as Node);

            // namesMapAs_signal_set(namesMap);
          }}
        >
          add name
        </button>

        <section>
          <h1>Names</h1>
          <ul ref={listRef}>
            {/* <For each={Array.from(namesMapAs_signal_get())}>
              {({ 0: key, 1: value }) => <li>{value}</li>}
            </For> */}

            {namesMapNodes}
            {/* {namesMapNodes_mutable} */}
            {/* {namesMap.values()} */}
          </ul>
        </section>

        <div>
          <button type="button" onClick={() => changeNameToSally()}>
            Name is: {name()}
          </button>
        </div>
      </main>
    </div>
  );
};

export default About;
