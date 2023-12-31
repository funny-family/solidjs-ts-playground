import { splitProps, type Component, type JSX, children } from 'solid-js';

const Div: Component<
  JSX.IntrinsicElements['div'] & {
    button?: JSX.Element;
  }
> = (attrsAndProps) => {
  const [props, attrs] = splitProps(attrsAndProps, ['button']);

  const buttonProp = children(
    props.button as any
  ) as unknown as () => HTMLElement;
  buttonProp().setAttribute('type', 'button');

  return (
    <>
      {/* {props?.button && props.button({ type: 'button' })} */}
      {props?.button && buttonProp()}
      <div {...attrs} />
    </>
  );
};

const ComponentAsFunctionProp = () => {
  return (
    <div>
      <h1>test</h1>
      <Div
        button={() => {
          return (
            <button
              onClick={() => {
                alert('Sup!');
              }}
            >
              Hi
            </button>
          );
        }}
      >
        I am a "div"!
      </Div>
    </div>
  );
};

export default ComponentAsFunctionProp;
