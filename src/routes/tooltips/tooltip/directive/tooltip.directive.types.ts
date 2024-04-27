import type {
  ChildrenReturn,
  Component,
  FlowComponent,
  JSX,
  VoidComponent,
} from 'solid-js';

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

  export type DirectiveFunction = (
    element: ElementOption,
    accessor: AccessorOption
  ) => void;

  export type DirectiveFunctionWithAdditions = DirectiveFunction & {
    on: <TType extends OnArgObject['type']>(
      ...args: Extract<OnArgObject, { type: TType }> extends {
        listener: infer TListener;
      }
        ? [TType, TListener]
        : // :(((((((
          [TType, any]
    ) => void;
  };

  export type CreateDirectiveFunction = () => DirectiveFunctionWithAdditions;

  export type DirectiveObject = {
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

  export type DirectiveFunctionDecorator<TArgs extends any[] = any> = (
    element: ElementOption,
    accessor: AccessorOption
  ) => (
    directive: DirectiveFunctionWithAdditions,
    ...any: TArgs
  ) => DirectiveFunctionWithAdditions;
}

export type WithResolvedChildren<TRecord extends any> = TRecord & {
  toArray: () => HTMLElement[];
};

export type Override<
  T,
  K extends { [P in keyof T]: any } | string
> = K extends string ? Omit<T, K> : Omit<T, keyof K> & K;

export type ResolvedChildrenOf<TRecord extends any> = TRecord &
  Override<ChildrenReturn, { toArray: () => HTMLElement[] }>;
