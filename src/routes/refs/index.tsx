import { onMount } from 'solid-js';
import { Transition } from 'solid-transition-group';

const Input = (attrsAndProps: any) => {
  var ref: HTMLInputElement = attrsAndProps?.ref as any;

  onMount(() => {
    console.log({ ref });
  });

  return (
    <>
      <input
        {...attrsAndProps}
        type={attrsAndProps?.type || 'text'}
        ref={(el) => {
          ref = el;
        }}
      />
    </>
  );
};

const Refs = () => {
  var inputRef: HTMLInputElement = null as any;

  onMount(() => {
    inputRef.focus();
  });

  var DefaultChildren = () => {
    return (
      <>
        <Input
          ref={(el: any) => {
            inputRef = el;
          }}
          // ref={inputRef}
        />
      </>
    );
  };

  return (
    <div>
      <DefaultChildren />
    </div>
  );
};

export default Refs;
