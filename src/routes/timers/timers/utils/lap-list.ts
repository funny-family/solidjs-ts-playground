import { Array_from } from './array.utils';

export type LapUnit = Number;

export interface LapListInterface<T = LapUnit> {
  get: () => T[];
  add: (lap: T) => this;
  remove: (lap: T) => boolean;
  clear: () => void;
}

export class LapList implements LapListInterface {
  #list = new Set<LapUnit>();

  get: LapListInterface['get'] = () => {
    return Array_from(this.#list);
  };

  add(lap: Parameters<LapListInterface['add']>[0]) {
    this.#list.add(lap);

    return this;
  }

  remove: LapListInterface['remove'] = (lap) => {
    return this.#list.delete(lap);
  };

  clear: LapListInterface['clear'] = () => {
    this.#list.clear();
  };
}
