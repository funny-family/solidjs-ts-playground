import type { Entry, PickKeyOf } from '../../../types';
import type { SetupClockReturnRecord } from '../../clock.composable.types';

export type ListenerType = PickKeyOf<SetupClockReturnRecord, 'start' | 'stop'>;

export type OnMethod = <TFunction extends Function>(
  type: ListenerType,
  listener: TFunction
) => void;

export type ClearEvent = (type: ListenerType) => void;

export type WithBaseEventsReturnRecord = {
  on: OnMethod;
  clearEvent: ClearEvent;
};

export type WithBaseEventsEntry = Entry<WithBaseEventsReturnRecord>;
