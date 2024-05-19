import type { SignalOptions, Accessor } from 'solid-js';

export type UseTooltipControlHookArgs<T extends boolean = boolean> = {
  value?: T;
  options?: SignalOptions<T>;
};

export type UseTooltipControlHookReturnValue = {
  visible: Accessor<boolean>;
  show: () => void;
  hide: () => void;
};

export type UseTooltipControlHook = (
  args?: UseTooltipControlHookArgs
) => UseTooltipControlHookReturnValue;
