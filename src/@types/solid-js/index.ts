export * from '../../../node_modules/solid-js';

import type { JSX } from 'solid-js';

type _IntrinsicElements = JSX.HTMLElementTags &
  JSX.HTMLElementDeprecatedTags &
  JSX.SVGElementTags;

type __IntrinsicElements = {
  [Tag in keyof _IntrinsicElements]: {
    [Attr in keyof _IntrinsicElements[Tag]]:
      | _IntrinsicElements[Tag][Attr]
      | null;
  };
};

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends __IntrinsicElements {}
  }
}
