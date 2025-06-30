import { Entry } from '../../../types';
import type { EventControlReturnRecord, ListenerWithInnerType } from '../types';
import type { RESET_EVENTS_SET_SYMBOL } from './with-reset-event.plugin';

export type WithBaseEventsRecord = EventControlReturnRecord<
  'start' | 'stop' | 'reset',
  VoidFunction
>;

export type BaseEventListener = ListenerWithInnerType<
  'start' | 'stop' | 'reset'
>;

export type WithResetEventRecord = EventControlReturnRecord<
  'start' | 'stop' | 'reset',
  VoidFunction
> & {
  [RESET_EVENTS_SET_SYMBOL]: Set<VoidFunction>;
};

export type WithResetEventRecordEntry = Entry<WithResetEventRecord>;

export type WithResetEventEntry = ['reset', () => boolean];

export type RecordMapEntry = WithResetEventEntry | WithResetEventRecordEntry;
