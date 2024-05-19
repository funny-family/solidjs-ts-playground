import { createMutable } from 'solid-js/store';
import type {
  UseTooltipControlsHook,
  UseTooltipControlsHookArgs,
} from './use-tooltip-control.hooks.types';

export var useTooltipControls = ((
  args: Required<UseTooltipControlsHookArgs>
) => {
  const tooltipsStore = createMutable({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  return {};
}) as UseTooltipControlsHook;
