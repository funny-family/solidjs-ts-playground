import type { Component, JSX } from 'solid-js';

type CountRootElement = HTMLSpanElement;

type CountAttrs = JSX.HTMLElementTags['span'];

type CountProps = {};

type CountCustomAttrs = JSX.CustomAttributes<CountRootElement>;

export type CountAttrsAndProps = CountAttrs & CountCustomAttrs & CountProps;

export type CountComponent = Component<CountAttrsAndProps>;
