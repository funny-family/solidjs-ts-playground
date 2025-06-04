import type { DependentMap, MapEntries } from '../types';

// WORK!
type P<TNew extends MapEntries> = <TBase extends MapEntries>(
  recordMap: DependentMap<TBase>
) => DependentMap<TBase | TNew>;

export var withTest: P<['date', () => Date] | ['test', () => void]> = (
  recordMap: DependentMap<['date', () => Date] | ['test', () => void]>
) => {
  const date = recordMap.get('date')!;
  const test = recordMap.get('test')!;

  return recordMap;
};

// ================================================================================================

// type P<TNew extends MapEntries> = <TBase extends MapEntries>(
//   recordMap: DependentMap<TBase> extends DependentMap<infer U>
//     ? DependentMap<TNew | U>
//     : never
// ) => DependentMap<TBase | TNew>;

// export var withTest: P<['date', () => Date] | ['test', () => void]> = (
//   recordMap
// ) => {
//   const date = recordMap.get('date')!;
//   const test = recordMap.get('test')!;

//   return recordMap;
// };

// ================================================================================================
