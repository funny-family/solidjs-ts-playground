import type { Entry, PickKeyOf } from '../../../types';
import type { SetupClockReturnRecord } from '../../clock.composable.types';
import type { LISTENER_TYPE_SYMBOL } from './with-base-events.plugin';

export type ListenerType = PickKeyOf<SetupClockReturnRecord, 'start' | 'stop'>;

export type OnMethod = <TFunction extends Function>(
  type: ListenerType,
  listener: TFunction
) => void;

export type ClearEvent = (listener: Function) => void;

export type ClearEventsOf = (type: ListenerType) => void;

export type ListenerWithInnerType = Function & {
  [LISTENER_TYPE_SYMBOL]: ListenerType;
};

export type WithBaseEventsReturnRecord = {
  on: OnMethod;
  clearEvent: ClearEvent;
  clearEventsOf: ClearEventsOf;
};

export type WithBaseEventsEntry = Entry<WithBaseEventsReturnRecord>;
