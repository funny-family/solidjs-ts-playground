import type { Entry, WithBaseLapsRecord } from '../../types';
import { LapUnit } from '../../utils/lap-list';

export type WithLapsRecord = Omit<WithBaseLapsRecord<LapUnit>, 'addLap'>;

export type WithLapsRecordEntry = Entry<WithLapsRecord>;
