export var object_fromEntries = Object.fromEntries;

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
