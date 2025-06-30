import type { EventControlReturnRecord, ListenerWithInnerType } from '../types';
import type { Entry } from '../../../types';
import type {
  START_EVENTS_SET_SYMBOL,
  STOP_EVENTS_SET_SYMBOL,
} from './with-base-events.plugin';

export type WithBaseEventsRecord = EventControlReturnRecord<
  'start' | 'stop',
  VoidFunction
> & {
  [START_EVENTS_SET_SYMBOL]: Set<VoidFunction>;
  [STOP_EVENTS_SET_SYMBOL]: Set<VoidFunction>;
};

export type WithBaseEventsRecordEntry = Entry<WithBaseEventsRecord>;

export type TimerBaseEventsEntry =
  | ['start', () => boolean]
  | ['stop', () => boolean];

export type BaseEventListener = ListenerWithInnerType<'start' | 'stop'>;

export type RecordMapEntry = TimerBaseEventsEntry | WithBaseEventsRecordEntry;
