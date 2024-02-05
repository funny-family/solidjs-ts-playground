import { createContext, getOwner, useContext } from 'solid-js';

const ParentContext = createContext({
  string: '',
  number: 0,
});

const Child1 = () => {
  const parentContext = useContext(ParentContext);
  const owner = getOwner();

  console.group('Child1');
  console.log('owner:', owner);
  console.log('parentContext:', parentContext);
  console.groupEnd();

  return (
    <section>
      <h1>Child 1</h1>
    </section>
  );
};

const Parent = () => {
  const owner = getOwner();

  console.group('Parent');
  console.log('owner:', owner);
  console.log('ParentContext:', ParentContext);
  console.groupEnd();

  return (
    <ParentContext.Provider
      value={{ ...ParentContext.defaultValue, number: 69 }}
    >
      <div>
        <h1>This is parent!</h1>
        <ul>
          <li>
            <Child1 />
          </li>
        </ul>
      </div>
    </ParentContext.Provider>
  );
};

const ProvideInject = () => {
  return (
    <div>
      <Parent />
    </div>
  );
};

export default ProvideInject;
