export { isRunning } from './states/states';

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

// export var
