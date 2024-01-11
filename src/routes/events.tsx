import { createSignal } from 'solid-js';

const Events = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <div>
        <div>count: {count()}</div>
        <div>
          <div>"change" event test</div>
          <div
            onChange={(event) => {
              console.log('count before:', count());
              console.log('"change" root event:', event);

              setCount((value) => value + 1);
              console.log('count after:', count());
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
      </div>

      <hr />

      <div
        onclick={(event) => {
          console.log('"oninput" event:', event);
        }}
      >
        inline click
      </div>
    </div>
  );
};

export default Events;
