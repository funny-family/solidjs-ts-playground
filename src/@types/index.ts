import type { JSX } from 'solid-js';

export type NodeRef<T = HTMLElement> = T | undefined;

// export type ForwardRefProp = {
//   forwardRef?: unknown;
// };

/**
 * @see https://stackoverflow.com/questions/51851677/how-to-get-argument-types-from-function-in-typescript
 */
export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

// HTMLElementTags
// type ComponentProps<T extends keyof JSX.HTMLElementTags | JSXElementConstructor<any>> =
//         T extends JSXElementConstructor<infer P>
//             ? P
//             : T extends keyof JSX.HTMLElementTags
//                 ? JSX.HTMLElementTags[T]
//                 : {};

export type HTMLElementPropsOf<T extends keyof JSX.HTMLElementTags> =
  T extends keyof JSX.HTMLElementTags ? JSX.HTMLElementTags[T] : {};

// export type PropOfComponent<C extends Component, P extends string> = Parameters<Component>[0]

// export type PickBoundEvent<T = any> = T extends Array<any> ? T : never;

// =========================================================================================
// https://catchts.com/union-array
// credits goes to https://stackoverflow.com/a/50375286
// https://matthias-falk.medium.com/tuple-union-conversions-in-typescript-77fef29cd6e6
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// Converts union to overloaded function
type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

// Finally me)
export type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];
// =========================================================================================

// export type ExtractBoundEventHandler<T extends Array<any>> = UnionToArray<
//   NonNullable<T>
// >[1];
