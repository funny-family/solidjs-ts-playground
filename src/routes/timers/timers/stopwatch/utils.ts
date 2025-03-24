import { Math_floor } from '../utils/math.utils';

export type ElapsedSeconds = (ms: number) => number;

/**
 * @description
 * Calculate elapsed seconds form initial time.
 *
 * @example
 * elapsedSeconds(ms);
 */
export const elapsedSeconds: ElapsedSeconds = (ms) =>
  Math_floor((ms % 60000) / 1000);

export type ElapsedMinutes = (ms: number) => number;

/**
 * @description
 * Calculate elapsed minutes form initial time.
 *
 * @example
 * elapsedMinutes(ms);
 */
export const elapsedMinutes: ElapsedMinutes = (ms) =>
  Math_floor(ms / (1000 * 60)) % 60;

export type ElapsedHours = (ms: number) => number;

/**
 * @description
 * Calculate elapsed hours form initial time.
 *
 * @example
 * elapsedMinutes(ms);
 */
export const elapsedHours: ElapsedMinutes = (ms) =>
  Math_floor(ms / (1000 * 60 * 60));

export type ElapsedMilliseconds = (ms: number) => number;
