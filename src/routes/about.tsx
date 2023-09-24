import type { Component, JSX } from 'solid-js';
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

  return (
    <div
      $ServerOnly={attrsAndProps.$ServerOnly}
      classList={attrsAndProps.classList}
      ref={attrsAndProps.ref}
    >
      <main>
        <h1>This is about page!</h1>

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
