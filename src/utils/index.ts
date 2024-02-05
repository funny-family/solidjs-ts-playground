import type { JSX } from 'solid-js';

/**
 * @see https://bobbyhadz.com/blog/javascript-check-if-number-between-two-numbers
 */
export const isNumberInRange = (number: number, min: number, max: number) =>
  number >= min && number <= max;

export const checkEventHandlerUnion = <
  T extends JSX.EventHandlerUnion<HTMLElement, Event>
  // T extends Function | any[]
>(
  eventHandlerUnion: T
) => {
  const e = {
    eventHandler: () => {},
    boundEventHandler: [],
  };

  if (typeof eventHandlerUnion === 'function') {
    e.eventHandler = eventHandlerUnion as any;
  }

  if (Array.isArray(eventHandlerUnion)) {
    e.boundEventHandler = eventHandlerUnion as any;
  }

  return e;
};

export const unwrapSignal = <T extends any>(signal: T) => {
  return (typeof signal === 'function' ? signal() : signal) as T;
};
