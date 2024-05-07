import {
  eachElementTypeListenerName,
  effectTypeListenerName,
} from '../constants';
import type { TooltipType } from '../tooltip.directive.types';

export var withLogging: TooltipType.DirectiveFunctionDecorator = (
  element,
  accessor
) => {
  return (directiveFunction) => {
    directiveFunction.on(effectTypeListenerName, () => {
      // console.log('element:', element);
      // console.log('accessor:', accessor);
    });

    directiveFunction.on(eachElementTypeListenerName, (args) => {
      // console.log('each-element:', args);
    });

    return directiveFunction;
  };
};
