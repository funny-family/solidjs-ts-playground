import type { BaseEntry, WithLapsRecordEntry } from './types';
import type { PluginFunction } from '../../../plugins/types';
import type { DependentMap } from '../../../types';
import { setup_withLaps } from '../../../plugins/setup-with-laps/setup-with-laps';

export const withLaps = ((
  recordMap: DependentMap<BaseEntry | WithLapsRecordEntry>
) => {
  const lapsControl = setup_withLaps();
  var setup_addLap = lapsControl.setup_addLap;
  const plugin = lapsControl.plugin;

  const date = recordMap.get('date')!;
  const addLap = setup_addLap(Number(date()));

  recordMap.set('addLap', addLap);

  return plugin(recordMap);
}) as PluginFunction<WithLapsRecordEntry>;
