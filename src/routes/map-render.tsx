import {
  For,
  onMount,
  type JSX,
  createEffect,
  createRenderEffect,
  createSignal,
} from 'solid-js';
import { createMutable, createStore } from 'solid-js/store';
import { insert } from 'solid-js/web';
import { ReactiveMap } from '~/utils/reactive-map';
import { propTraps } from './forms/utils/utils/prop-traps';

// https://gist.github.com/tizmagik/19ba6516064a046a37aff57c7c65c9cd
// https://stackoverflow.com/questions/30921283/how-to-get-a-last-element-of-es6-map-without-iterations

const MapRender = () => {
  let listRef: HTMLUListElement | null = null;
  let mapContainerRef: HTMLUListElement | null = null;

  const namesMap = new ReactiveMap([
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
  window.namesMap = namesMap;

  // const namesMapNodes = Array<JSX.Element>(namesMap.size);
  // namesMap.forEach((value, key) => {
  //   namesMapNodes.push(
  //     <li data-key={key}>
  //       <div>name: {value.name}</div>
  //       <div>age: {value.age}</div>
  //     </li>
  //   );
  // });

  // const [namesMap_get, namesMap_set] = createStore(Array.from(namesMap));
  createEffect(() => {
    // namesMap_set(Array.from(namesMap));
    console.log(111, namesMap);

    namesMap.forEach((value, key) => {
      insert(mapContainerRef as Element, () => (
        <li data-key={key}>
          <div>name: {value.name}</div>
          <div>age: {value.age}</div>
        </li>
      ));
    });
  });

  onMount(() => {
    // namesMap.forEach((value, key) => {
    //   listRef!.appendChild(
    //     (
    //       <li data-key={key}>
    //         <div>name: {value.name}</div>
    //         <div>age: {value.age}</div>
    //       </li>
    //     ) as Node
    //   );
    // });
  });

  var v = 'hjsgf8674';
  var fieldsMap = new Map();
  // var fieldsMap = new ReactiveMap();
  window.fieldsMap1 = fieldsMap;
  window.registerNameField = () => {
    var [name, setName] = createSignal('hjsgf8674');

    var field = {
      name: 'name',
      // value: v,
      getValue: name,
      setValue: (fieldValue: any) => {
        setName(fieldValue);

        return name;
      },
      onChange: (fieldValue: any) => {
        console.log(fieldValue);

        field.setValue(fieldValue);
      },
    };
    fieldsMap.set('name', field);
  };
  registerNameField();

  var unregisterNameField = () => {
    var field = fieldsMap.get('name');

    field.value = v;

    return fieldsMap.delete('name');
  };
  window.unregisterNameField = unregisterNameField;

  var getNameField = () => {
    var field = fieldsMap.get('name');

    if (field == null) {
      return undefined;
    }

    return field;
  };

  var map = new Map();
  window.map1 = map;
  var [$, $$] = createSignal(0);

  var _field = new Proxy({} as Record<string, any>, {
    get(target, property, receiver) {
      $$((v) => v + 1);

      return map.get(property);
    },
  });
  var state = {
    field: _field,
  };
  window.state1 = state;

  return (
    <div>
      <ul ref={mapContainerRef} />
      <button
        type="button"
        onClick={() => {
          namesMap.set(1, {
            name: 'Robert)',
            age: 69,
          });
        }}
      >
        change 1
      </button>

      <hr />

      <div>
        <h1>name</h1>
        <div>name: {state.field?.name?.value}</div>
        <div>value: {state.field?.name?.value}</div>
      </div>

      <hr />

      <div>
        <h1>name field</h1>
        {() => {
          var fld = fieldsMap.get('name');

          console.log({ fld });

          return (
            <>
              <div>value: {getNameField()?.getValue()}</div>
              <input
                type="text"
                name={getNameField()?.name}
                value={getNameField()?.getValue()}
                // value={fieldsMap.get('name')?.value}
                // value={fld.value}
                onChange={(event) => {
                  var f = getNameField()?.onChange;
                  f?.(event.target.value);
                  console.log(typeof f);
                }}
              />
            </>
          );
        }}
      </div>
    </div>
  );
};

export default MapRender;
