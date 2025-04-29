import type { EventControlReturnRecord, ListenerWithInnerType } from '../types';
import type { Entry } from '../../../types';

export type WithBaseEventsRecord = EventControlReturnRecord<
  'start' | 'stop',
  VoidFunction
>;

export type WithBaseEventsRecordEntry = Entry<WithBaseEventsRecord>;

export type TimerBaseEventsEntry =
  | ['start', () => boolean]
  | ['stop', () => boolean];

export type BaseEventListener = ListenerWithInnerType<'start' | 'stop'>;


