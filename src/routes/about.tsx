import { createSign } from 'crypto';
import {
  Index,
  type Component,
  type JSX,
  For,
  mapArray,
  createSignal,
  onMount,
  children,
  createEffect,
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

  const namesMapNodes = Array<JSX.Element>(namesMap.size);
  const namesMapNodes_mutable = createMutable(
    Array<JSX.Element>(namesMap.size)
  );

  onMount(() => {
    namesMap.forEach((value, key, map) => {
      namesMapNodes.push(
        <li>
          <div>name: {value.name}</div>
          <div>age: {value.age}</div>
        </li>
      );
      // namesMapNodes_mutable.push(<li>{value}</li>);
      // listRef!.appendChild(
      //   (
      //     <li>
      //       <div>name: {value.name}</div>
      //       <div>age: {value.age}</div>
      //     </li>
      //   ) as Node
      // );
    });
  });

  const memo1 = children(() => namesMapNodes);
  createEffect(() => {
    const children = memo1();
    console.log(children);

    // children!.forEach((child) => child.classList.add('list-child'));
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

            const key = namesMap.size + 1;
            const value = crypto.randomUUID();
            namesMap.set(key + 1, {
              name: value,
              age: Math.floor(Math.random() * 10),
            });
            // listRef!.appendChild((<li>{value}</li>) as Node);

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

            {/* {namesMapNodes} */}
            {/* {namesMapNodes_mutable} */}
            {/* {namesMap.values()} */}

            {/* <For each={Object.entries(namesMap)}>
              {({ 0: key, 1: value }) => {
                console.log(1);

                return (
                  <li>
                    <div>name: {value.name}</div>
                    <div>age: {value.age}</div>
                  </li>
                );
              }}
            </For> */}

            <For each={memo1()}>{(item) => item}</For>
          </ul>
        </section>

        <div>
          <button type="button" onClick={() => changeNameToSally()}>
            Name is: {name()}
          </button>
        </div>

        <hr />
        <div>
          <div>"change" event test</div>
          <div
            onChange={(event) => {
              console.log('"change" root event:', event);
            }}
          >
            <input
              type="text"
              // onChange={(event) => {
              //   console.log('"change" input event:', event);
              // }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
