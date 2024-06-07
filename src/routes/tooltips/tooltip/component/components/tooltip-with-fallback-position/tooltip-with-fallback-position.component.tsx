import {
  createUniqueId,
  onCleanup,
  onMount,
  children as toChildren,
} from 'solid-js';
import type { TooltipWithFallbackPositionComponent } from './tooltip-with-fallback-position.component.types';
import { transitionEndListenersMap } from '../../../utils';

export var TooltipWithFallbackPosition: TooltipWithFallbackPositionComponent = (
  attrsAndProps
) => {
  var children = toChildren(() => {
    return attrsAndProps.children;
  }) as unknown as () => HTMLElement;

  var uniqueId = createUniqueId();

  const onTransitionEnd = (event: TransitionEvent) => {
    var target = event.target as HTMLElement;

    if (target.isEqualNode(children()) === false) {
      return;
    }

    if (attrsAndProps?.classes != null) {
      for (var i = 0; i < attrsAndProps.classes.length; i++) {
        // prettier-ignore
        // if ((target.getBoundingClientRect().width + target.getBoundingClientRect().left) > document.body.getBoundingClientRect().width) {
        //   target.classList.add(attrsAndProps.classes[i]);
        // } else {
        //   continue
        // }

        var bodyRect = document.body.getBoundingClientRect();
        var elementRect = target.getBoundingClientRect();

        var c = attrsAndProps.classes[i];

        target.classList.add(c);

        if (elementRect.width + elementRect.left > bodyRect.width) {
          console.log(c);

          target.classList.remove(c);
        } else {
          break;
        }
      }

      // // prettier-ignore
      // if ((elementRect.width + elementRect.left) > bodyRect.width) {
      //   target.classList.add(...attrsAndProps.classes);
      // }
    }
  };

  // var requestID = 0;

  // const onTransitionEnd = (event: TransitionEvent) => {
  //   var animate = () => {
  //     console.log(1);

  //     requestID = requestAnimationFrame((time) => {
  //       console.log(time);

  //       animate();
  //     });

  //     console.log(2);
  //   };

  //   animate();
  // };

  transitionEndListenersMap.set(uniqueId, onTransitionEnd);

  onCleanup(() => {
    transitionEndListenersMap.delete(uniqueId);

    // cancelAnimationFrame(requestID);
  });

  return children;
};
