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

// export type UnionToIntersection<U> = (
//   U extends any ? (k: U) => void : never
// ) extends (k: infer I) => void
//   ? I
//   : never;

type InArray<T, X> = T extends readonly [X, ...infer _Rest]
  ? true
  : T extends readonly [X]
  ? true
  : T extends readonly [infer _, ...infer Rest]
  ? InArray<Rest, X>
  : false;

/**
 * @see https://stackoverflow.com/questions/57016728/is-there-a-way-to-define-type-for-array-with-unique-items-in-typescript
 */
export type UniqueArray<T> = T extends readonly [infer X, ...infer Rest]
  ? InArray<Rest, X> extends true
    ? ['Encountered value with duplicates:', X]
    : readonly [X, ...UniqueArray<Rest>]
  : T;

/**
 * @see https://stackoverflow.com/questions/53501721/typescript-exclude-property-key-when-starts-with-target-string
 *
 * @description
 * Exclude Property key when starts with target string
 *
 * @example
 * type Origin = {
 *    a: string;
 *    b: string;
 *    _c: string;
 *    _d: string;
 * };
 *
 * type Result = FilterStartsWith<Origin, '_'>; // { _c: string; _d: string; }
 */
export type FilterStartsWith<
  Set,
  Needle extends string
> = Set extends `${Needle}${infer _X}` ? Set : never;

/**
 * @see https://stackoverflow.com/questions/53501721/typescript-exclude-property-key-when-starts-with-target-string
 *
 * @description
 * Exclude Property key when starts with target string
 *
 * @example
 * type Origin = {
 *    a: string;
 *    b: string;
 *    _c: string;
 *    _d: string;
 * };
 *
 * type Result = FilterNotStartingWith<Origin, '_'>; // { a: string; b: string; }
 */
export type FilterNotStartingWith<
  Set,
  Needle extends string
> = Set extends `${Needle}${infer _X}` ? never : Set;

/**
 * @see https://dev.to/vborodulin/ts-how-to-override-properties-with-type-intersection-554l
 *
 * @description
 * Override properties with type intersection
 *
 * @example
 * interface A {
 *   a: string;
 *   b: string;
 * }
 *
 * interface AB extends A {
 *   b: number;
 * }
 * type Override<T1, T2> = Omit<T1, keyof T2> & T2;
 *
 * type AB = Override<A, { b: number }>
 */
export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type KeysOf<T> = Array<keyof T>;
