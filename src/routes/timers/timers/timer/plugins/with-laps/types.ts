import type { Entry, WithBaseLapsRecord } from '../../../types';
import type { LapUnit } from '../../../utils/lap-list';
import type { TimerRecord } from '../../timer.composable.types';

export type WithLapsRecord = WithBaseLapsRecord<LapUnit>;

export type WithLapsRecordEntry = Entry<WithLapsRecord>;

export type BaseEntry = Entry<Pick<TimerRecord, 'milliseconds'>>;
