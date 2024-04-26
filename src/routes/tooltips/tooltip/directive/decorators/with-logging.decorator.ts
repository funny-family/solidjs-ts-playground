import type { TooltipType } from '../tooltip.directive.types';

export var withLogging: TooltipType.DirectiveFunctionDecorator = (
  element,
  accessor
) => {
  return (directiveFunction) => {
    directiveFunction.on('effect', () => {
      // console.log('element:', element);
      // console.log('accessor:', accessor);
    });

    directiveFunction.on('each-element', (args) => {
      // console.log('each-element:', args);
    });

    return directiveFunction;
  };
};
