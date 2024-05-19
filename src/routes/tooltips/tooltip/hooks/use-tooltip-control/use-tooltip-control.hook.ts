import { createSignal } from 'solid-js';
import type {
  UseTooltipControlHook,
  UseTooltipControlHookArgs,
} from './use-tooltip-control.hook.types';

export var createTooltipControl = () => {
  var useTooltipControl = ((args: Required<UseTooltipControlHookArgs>) => {
    args.value ||= false;
    args.options ||= {};

    var { 0: visible, 1: setVisibility } = createSignal(
      args.value || false,
      args.options
    );

    return {
      visible,
      show: () => {
        setVisibility(true);
      },
      hide: () => {
        setVisibility(false);
      },
    };
  }) as UseTooltipControlHook;

  return useTooltipControl;
};

export var useTooltipControl = createTooltipControl();
