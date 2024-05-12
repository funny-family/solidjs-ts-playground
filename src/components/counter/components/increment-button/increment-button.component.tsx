import { mergeProps } from 'solid-js';
import type { Component } from 'solid-js';
import type { HTMLElementPropsOf } from '~/@types';

type IncrementButtonElement = HTMLButtonElement;
type IncrementButtonAttrs = HTMLElementPropsOf<'button'>;
type IncrementButtonProps = {};
type IncrementButtonAttrsAndProps = IncrementButtonAttrs & IncrementButtonProps;

type OmittedAttrs = '';

export type IncrementButtonExportedComponent = Component<
  Omit<IncrementButtonAttrsAndProps, OmittedAttrs>
>;
type IncrementButtonLocalComponent = Component<IncrementButtonAttrsAndProps>;

export let IncrementButton =
  undefined as unknown as IncrementButtonExportedComponent;
IncrementButton = ((incomingProps) => {
  const defaultAttrsAndProps = {
    children: '+',
  } satisfies IncrementButtonAttrsAndProps;
  incomingProps = mergeProps(defaultAttrsAndProps, incomingProps);

  return <button {...incomingProps}>{incomingProps.children}</button>;
}) satisfies IncrementButtonLocalComponent;
