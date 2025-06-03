import type { Entry, WithBaseLapsRecord } from '../../../types';
import type { LapUnit } from '../../../utils/lap-list';
import type { ClockRecord } from '../../clock.composable.types';

export type WithLapsRecord = WithBaseLapsRecord<LapUnit>;

export type WithLapsRecordEntry = Entry<WithLapsRecord>;

export type BaseEntry = Entry<Pick<ClockRecord, 'date'>>;
