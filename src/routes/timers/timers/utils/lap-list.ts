import { Array_from } from './array.utils';

interface LapListInterface<T extends any = unknown> {
  get: () => T[];
  add: (lap: T) => this;
  remove: (lap: T) => boolean;
  clear: () => void;
}

export var LAP_ID_SYMBOL = Symbol('LAP_ID_SYMBOL');

export class LapList<T extends any> implements LapListInterface<T> {
  #id = 0;
  #list = new Map<string, T>();

  get: LapListInterface<T>['get'] = () => {
    return Array_from(this.#list, (entry) => entry[1]);
  };

  add(lap: Parameters<LapListInterface<T>['add']>[0]) {
    lap[LAP_ID_SYMBOL] = this.#id;

    this.#list.set(this.#id++, lap);

    return this;
  }

  remove: LapListInterface<T>['remove'] = (lap) => {
    return this.#list.delete(lap[LAP_ID_SYMBOL]);
  };

  clear: LapListInterface<T>['clear'] = () => {
    this.#list.clear();
  };
}
