import {
  type JSX,
  type Component,
  children,
  createUniqueId,
  onMount,
} from 'solid-js';

const fff = <T extends any>(value: T) => (!!value === true ? value : null);

const getForwardEl = <T extends HTMLElement>(el: T) => {
  return el.querySelector(`[data-forward-el="${el.dataset.rootEl}"]`);
};

// dataset
// :
// DOMStringMap
// rootEl
// :
// ""

const Div = (() => {
  const Component: Component<JSX.IntrinsicElements['div']> = (attrs) => {
    return <div {...attrs} />;
  };

  Component.sayHi = () => {
    console.log('Hi!');
  };

  return Component;
})();

const Input: Component<JSX.IntrinsicElements['input']> = (attrs) => {
  const dataElId = createUniqueId();

  return (
    <div data-root-el={dataElId}>
      <input
        {...attrs}
        type={attrs?.type || 'text'}
        data-forward-el={dataElId}
      />
    </div>
  );
};

// const InputWithLabel: Component<JSX.IntrinsicElements['label']> = (attrs) => {
//   const inputComponentElement = children(
//     () => attrs.children
//   )() as HTMLInputElement;
//   const { children: _children, ...rest } = attrs;

//   inputComponentElement.insertAdjacentElement(
//     'afterbegin',
//     (<label {...rest} />) as Element
//   );

//   console.log({
//     inputComponentElement,
//     frwEl: getForwardEl(inputComponentElement),
//   });

//   return inputComponentElement;
// };

const InputWithLabel = (props: {
  children: JSX.Element;
  label: JSX.Element;
}) => {
  const resolvedChildren = children(() => props.children)() as HTMLElement;
  resolvedChildren.insertAdjacentElement('afterbegin', props.label as Element);

  console.log({
    resolvedChildren,
    children: props.children,
    label: props.label,
  });

  return resolvedChildren;
};

const DecoratorComponent = () => {
  let inputRef = null;

  onMount(() => {
    console.log({ inputRef });
  });

  Div.sayHi();

  return (
    <section>
      <h1>Decorator component test</h1>
      <Div>123131321</Div>
      <section>
        <h1>Input with label</h1>
        <p>
          <InputWithLabel label={<label>This is label!</label>}>
            <Input ref={inputRef} />
          </InputWithLabel>
        </p>
      </section>
    </section>
  );
};

export default DecoratorComponent;
