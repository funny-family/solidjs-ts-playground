import { mergeProps } from 'solid-js';
import type { Component } from 'solid-js';
import type { HTMLElementPropsOf } from '~/@types';

type DecrementButtonElement = HTMLButtonElement;
type DecrementButtonAttrs = HTMLElementPropsOf<'button'>;
type DecrementButtonProps = {};
type DecrementButtonAttrsAndProps = DecrementButtonAttrs & DecrementButtonProps;

type OmittedAttrs = '';

export type DecrementButtonExportedComponent = Component<
  Omit<DecrementButtonAttrsAndProps, OmittedAttrs>
>;
type DecrementButtonLocalComponent = Component<DecrementButtonAttrsAndProps>;

export let DecrementButton =
  undefined as unknown as DecrementButtonExportedComponent;
DecrementButton = ((incomingProps) => {
  const defaultAttrsAndProps = {
    children: '-',
  } satisfies DecrementButtonAttrsAndProps;
  incomingProps = mergeProps(defaultAttrsAndProps, incomingProps);

  return <button {...incomingProps}>{incomingProps.children}</button>;
}) satisfies DecrementButtonLocalComponent;
