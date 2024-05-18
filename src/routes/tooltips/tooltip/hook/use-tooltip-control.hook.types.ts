import type { JSX, SignalOptions, Accessor } from 'solid-js';

export type UseTooltipControlHookArgs<T extends boolean = boolean> = {
  value?: T;
  options?: SignalOptions<T>;
};

export type UseTooltipControlHookReturnValue = {
  isVisible: Accessor<boolean>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export type UseTooltipControlHook = (
  args?: UseTooltipControlHookArgs
) => UseTooltipControlHookReturnValue;
