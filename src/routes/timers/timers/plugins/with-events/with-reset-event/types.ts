import { Entry } from '../../../types';
import type { EventControlReturnRecord, ListenerWithInnerType } from '../types';

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
>;

export type WithResetEventRecordEntry = Entry<WithResetEventRecord>


export type WithResetEventEntry = ['reset', () => boolean];
