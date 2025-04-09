import { Object_fromEntries } from './object.utils';
import type { DependentMap, MapEntries, ObjectFromEntries } from '../types';

export type CreateFormat = (
  numberFormat: Intl.NumberFormat
) => (milliseconds: number) => string;

// prettier-ignore
export var createFormat: CreateFormat =
  (numberFormat) =>
  (milliseconds) =>
    numberFormat.format(milliseconds)
      .slice(-2);

/**
 * @example
 * formatTime(0); // "00"
 * formatTime(1); // "01"
 * formatTime(34); // "34"
 */
export var formatTime = createFormat(
  new Intl.NumberFormat('en', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
);

export var fromEntries: <
  T extends DependentMap<MapEntries>,
  R extends MapEntries = T extends DependentMap<infer U> ? U : T
>(
  entries: T
) => ObjectFromEntries<R> = Object_fromEntries;

export {
  isRunning,
  IDEL_STATE,
  RUNNING_STATE,
  STOPPED_STATE,
} from './states/states';
export { Object_fromEntries };
