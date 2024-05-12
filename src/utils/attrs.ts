import type { JSX } from 'solid-js';
import type { FilterNotStartingWith } from '~/@types';

export const solidjsCustomAttrs = [
  '$ServerOnly',
  'classList',
  'ref',
] satisfies (keyof JSX.CustomAttributes<any>)[];

type DistinctArray<T extends unknown[], U = T> = T extends []
  ? U
  : T extends [head: infer Head, ...rest: infer Tail]
  ? Head extends Tail[number]
    ? never
    : DistinctArray<Tail, U>
  : never;

// type SolidjsHTMLAttributes = any;

// ==================================================================================

type UnionToIntersection<U> = (
  U extends never ? never : (arg: U) => never
) extends (arg: infer I) => void
  ? I
  : never;

type UnionToTuple<T> = UnionToIntersection<
  T extends never ? never : (t: T) => T
> extends (_: never) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : [];

type SolidjsHTMLAttribute = Pick<
  JSX.HTMLAttributes<any>,
  FilterNotStartingWith<
    keyof JSX.HTMLAttributes<any>,
    'on' | 'aria-' | keyof JSX.CustomAttributes<any>
  >
>;

type SolidjsHTMLAttributeWithoutAriaAndEvent = Pick<
  JSX.HTMLAttributes<any>,
  FilterNotStartingWith<keyof JSX.HTMLAttributes<any>, 'on' | 'aria-'>
>;

export const solidjsHTMLAttributes = [
  'accessKey',
  'class',
  'contenteditable',
  'contextmenu',
  'dir',
  'draggable',
  'hidden',
  'id',
  'lang',
  'spellcheck',
  'style',
  'tabindex',
  'title',
  'translate',
  'about',
  'datatype',
  'inlist',
  'prefix',
  'property',
  'resource',
  'typeof',
  'vocab',
  'autocapitalize',
  'slot',
  'color',
  'itemprop',
  'itemscope',
  'itemtype',
  'itemid',
  'itemref',
  'part',
  'exportparts',
  'inputmode',
  'contentEditable',
  'contextMenu',
  'tabIndex',
  'autoCapitalize',
  'itemProp',
  'itemScope',
  'itemType',
  'itemId',
  'itemRef',
  'exportParts',
  'inputMode',
] satisfies (keyof SolidjsHTMLAttribute)[];

export type DataAttributes = {
  [key: `data-${string}`]: any;
};


type HTMLGlobalAttributes = {} & DataAttributes;
