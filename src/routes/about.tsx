import { Index, type Component, type JSX, For, mapArray } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useNames } from '~/store/names.store';

type AboutAttrs = JSX.CustomAttributes<HTMLDivElement>;
type AboutProps = {};
type AboutAttrsAndProps = AboutAttrs & AboutProps;

type AboutComponent = Component<AboutAttrsAndProps>;

const About: AboutComponent = (attrsAndProps) => {
  const { name, changeNameToSally } = useNames();

  const namesMap = new Map([
    [0, 'James'],
    [1, 'Robert'],
    [2, 'John'],
    [3, 'Michael'],
  ]);

  const [getNamesMap, setNamesMap] = createStore(Array.from(namesMap));

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
          onClick={() => namesMap.set(namesMap.size, '111')}
        >
          add name
        </button>

        <section>
          <h1>Names</h1>
          <ul>
            <For each={getNamesMap}>
              {({ 0: key, 1: value }) => <li>{value}</li>}
            </For>
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
