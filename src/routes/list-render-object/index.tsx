import { createMutable } from 'solid-js/store';
import { ReactiveMap } from '@solid-primitives/map';
import { createEffect } from 'solid-js';

var ListRenderObject = () => {
  var usersListRef: HTMLUListElement = null as any;

  var users = new ReactiveMap([
    [
      0,
      {
        name: 'da45',
        age: 65,
      },
    ],
    [
      1,
      {
        name: 'adjhv56',
        age: 77,
      },
    ],
    [
      2,
      {
        name: 'sfmh87u6',
        age: 1,
      },
    ],
    [
      3,
      {
        name: 'byhrf67',
        age: 34,
      },
    ],
  ]);

  var s = createMutable({
    0: 'djiadla',
    1: 'sfxkhj',
    2: 'sfuh785',
  });

  // users.forEach((value, key, map) => {
  //   //
  // });

  createEffect(() => {
    users.forEach((value, key, map) => {
      usersListRef.appendChild(
        (
          <li>
            <div>name: {value.name}</div>
            <div>age: {value.age}</div>
          </li>
        ) as Node
      );
    });
  });

  return (
    <main>
      <button
        type="button"
        onClick={() => {
          users.get(0)!.name = '786287324';
          users.get(0)!.name = '786287324';
        }}
      >
        change
      </button>

      <section>
        <h1>users list</h1>
        <ul ref={usersListRef} />
      </section>
    </main>
  );
};

export default ListRenderObject;
