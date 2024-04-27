import type { Component, FlowComponent, JSX, VoidComponent } from 'solid-js';

export namespace TooltipType {
  export type DefaultPosition =
    | 'top-left-corner'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'top-right-corner'
    | 'right-top'
    | 'right-center'
    | 'right-bottom'
    | 'bottom-right-corner'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-left-corner'
    | 'left-bottom'
    | 'left-center'
    | 'left-top';

  export type ElementOption = HTMLElement;

  export type AccessorOption = () => HTMLElement | HTMLElement[];

  export type OnArgObject =
    | {
        type: 'effect';
        listener: () => void;
      }
    | {
        type: 'each-element';
        listener: (args: {
          tooltip: HTMLElement;
          style: CSSStyleDeclaration;
          computedStyle: CSSStyleDeclaration;
        }) => void;
      };

  export interface DirectiveFunction {
    (element: ElementOption, accessor: AccessorOption): void;
    on: <TType extends OnArgObject['type']>(
      ...args: Extract<OnArgObject, { type: TType }> extends {
        listener: infer TListener;
      }
        ? [TType, TListener]
        // :(((((((
        : [TType, any]
    ) => void;
  }

  export type CreateDirectiveFunction = () => DirectiveFunction;

  export type Directive = {
    /**
     * @example
     * <p
     *  use:tooltip={
     *    <div class="tooltip">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, ut?</div>
     * }
     * >
     *   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores a
     *   amet alias temporibus quas molestiae doloribus non maxime maiores
     *   laudantium.
     * </p>
     */
    tooltip: JSX.Element | Component | VoidComponent | FlowComponent | Function;
  };

  export type DirectiveFunctionDecorator = <TArgs extends any[] = never>(
    element: ElementOption,
    accessor: AccessorOption
  ) => (directive: DirectiveFunction, ...any: TArgs) => DirectiveFunction;
}

export type WithResolvedChildren<TRecord extends any> = TRecord & {
  toArray: () => HTMLElement[];
};
