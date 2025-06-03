import { createSignal } from 'solid-js';
import type { DependentMap } from '../../types';
import { LapList } from '../../utils/lap-list';
import type { WithLapsRecord, WithLapsRecordEntry } from './types';
import type { PluginFunction } from '../types';

export var setup_withLaps = () => {
  var lapList = new LapList();

  var lapList_get = lapList.get;
  const lapsSignal = createSignal(lapList_get());
  var laps = lapsSignal[0];
  var setLaps = lapsSignal[1];

  var updateLapList = () => setLaps(lapList_get());

  const setup_addLap = (lap: Number) => () => {
    lapList.add(lap);

    updateLapList();

    return lap;
  };

  const plugin = ((recordMap: DependentMap<WithLapsRecordEntry>) => {
    const deleteLap: WithLapsRecord['deleteLap'] = (lap) => {
      const value = lapList.remove(lap);

      updateLapList();

      return value;
    };

    const clearLaps: WithLapsRecord['clearLaps'] = () => {
      lapList.clear();

      updateLapList();
    };

    recordMap.set('laps', laps);
    recordMap.set('deleteLap', deleteLap);
    recordMap.set('clearLaps', clearLaps);

    return recordMap;
  }) as PluginFunction<WithLapsRecordEntry>;

  return {
    lapList,
    updateLapList,
    setup_addLap,
    plugin,
  };
};
