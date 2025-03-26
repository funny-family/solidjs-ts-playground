import { Math_floor } from '../../utils/math.utils';
import type { ElapseFunction } from './utils.types';

/**
 * @description
 * Calculate elapsed seconds form initial time.
 *
 * @example
 * elapsedSeconds(ms);
 */
export const elapsedSeconds: ElapseFunction = (ms) =>
  Math_floor((ms % 60000) / 1000);

/**
 * @description
 * Calculate elapsed minutes form initial time.
 *
 * @example
 * elapsedMinutes(ms);
 */
export const elapsedMinutes: ElapseFunction = (ms) =>
  Math_floor(ms / (1000 * 60)) % 60;

/**
 * @description
 * Calculate elapsed hours form initial time.
 *
 * @example
 * elapsedMinutes(ms);
 */
export const elapsedHours: ElapseFunction = (ms) =>
  Math_floor(ms / (1000 * 60 * 60));
