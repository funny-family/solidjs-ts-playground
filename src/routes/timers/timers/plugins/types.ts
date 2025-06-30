import type { DependentMap, MapEntries } from '../types';

type PickEntry<T extends [any, any]> = {
  [Key in T[0]]: [Key, any];
}[T[0]];

// export type PluginFunction<TEntry extends MapEntries> = <
//   TRecordMapEntry extends MapEntries
// >(
//   recordMap: DependentMap<TRecordMapEntry>
// ) => DependentMap<TEntry | Exclude<TRecordMapEntry, PickEntry<TEntry>>>;

// export type PluginFunction<TNew extends MapEntries> = <
//   TBase extends MapEntries
// >(
//   recordMap: DependentMap<TBase>
// ) => DependentMap<Exclude<TBase, PickEntry<TNew>> | TNew>;

export type PluginFunction<TNew extends MapEntries> = <
  TBase extends MapEntries
>(
  recordMap: DependentMap<TBase>
) => DependentMap<TNew | Exclude<TBase, PickEntry<TNew>>>;
