import { ReactiveMap } from '@solid-primitives/map';
import { For } from 'solid-js';

export var Section2 = () => {
  var datesMap = new ReactiveMap();
  window.datesMap = datesMap;
  datesMap.set(0, new Date(35357863587));
  datesMap.set(1, new Date(83456978436));
  datesMap.set(2, new Date(245362));

  var dates = [datesMap.get(0), datesMap.get(1), datesMap.get(2)];

  return (
    <div>
      <For each={datesMap.values().toArray()}>
        {(date) => {
          return <div>{date.toString()}</div>;
        }}
      </For>
    </div>
  );
};
