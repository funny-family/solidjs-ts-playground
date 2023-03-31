import type { JSX } from 'solid-js';

/**
 * @see https://bobbyhadz.com/blog/javascript-check-if-number-between-two-numbers
 */
export const isNumberInRange = (number: number, min: number, max: number) =>
  number >= min && number <= max;
