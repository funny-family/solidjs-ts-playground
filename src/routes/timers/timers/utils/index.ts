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

export var formatTime = createFormat(
  new Intl.NumberFormat('en', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
);
