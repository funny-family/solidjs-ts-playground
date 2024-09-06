export var Object_fromEntries = Object.fromEntries;

export class ReversIterableArray<T> extends Array<T> {
  *[Symbol.iterator]() {
    for (var i = this.length - 1; i >= 0; i--) {
      yield this[i];
    }
  }

  *[Symbol.asyncIterator]() {
    for (var i = this.length - 1; i >= 0; i--) {
      yield this[i];
    }
  }
}

export class PseudoPromiseQueue<TKey, TValue> extends Map<TKey, TValue> {
  //
}
