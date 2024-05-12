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
      // console.group('effect');
      // console.log('element:', element);
      // console.log('accessor:', accessor);
      // console.groupEnd();
    });

    directiveFunction.on(eachElementTypeListenerName, (args) => {
      console.group('each-element');
      console.log('args:', args);
      // console.log('element:', element);
      // console.log('accessor:', accessor);
      console.groupEnd();
    });

    return directiveFunction;
  };
};
