import { createSignal } from 'solid-js';
import type {
  UseTooltipControlHook,
  UseTooltipControlHookArgs,
} from './use-tooltip-control.hook.types';

export var useTooltipControl = ((args: Required<UseTooltipControlHookArgs>) => {
  args.value ||= false;
  args.options ||= {};

  var { 0: isVisible, 1: setVisibility } = createSignal(
    args.value || false,
    args.options
  );

  return {
    isVisible,
    onMouseEnter: () => {
      setVisibility(true);
    },
    onMouseLeave: () => {
      setVisibility(false);
    },
  };
}) as UseTooltipControlHook;
