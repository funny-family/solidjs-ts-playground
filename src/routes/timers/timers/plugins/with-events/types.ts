import type {
  PickKeyOf,
  StartFunctionRecord,
  StopFunctionRecord,
} from '../../types';
import { LISTENER_TYPE_SYMBOL } from './utils';

export type ListenerType = PickKeyOf<
  StartFunctionRecord & StopFunctionRecord,
  'start' | 'stop'
>;

export type OnMethod = <TType extends string>(
  type: TType,
  listener: VoidFunction
) => void;

export type ClearEvent = (listener: VoidFunction) => void;

export type ClearEventsOf = (type: ListenerType) => void;

export type EventControlReturnRecord<
  TType extends string,
  TListener extends Function
> = {
  on: (type: TType, listener: TListener) => void;
  clearEvent: (listener: TListener) => void;
  clearEventsOf: (type: TType) => void;
};

export type ListenerWithInnerType<T extends string> = VoidFunction & {
  [LISTENER_TYPE_SYMBOL]: T;
};
