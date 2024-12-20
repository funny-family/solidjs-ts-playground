import './modal.styles.css';
import {
  createEffect,
  createSignal,
  JSX,
  on,
  onCleanup,
  onMount,
  splitProps,
  children as toChildren,
} from 'solid-js';
import type { ModalComponent, ModalRef } from './modal.types';

var isArray = Array.isArray;

export var ModalExposeSymbol = Symbol('expose');

export var Modal: ModalComponent = (attrsAndProps) => {
  var splittedProps = splitProps(
    attrsAndProps,
    ['classList', 'ref', '$ServerOnly', 'children'],
    ['shouldCloseOnBackgroundClick', 'onOpen']
  );
  var customAttr = splittedProps[0];
  var props = splittedProps[1];
  var attrs = splittedProps[2];

  var customAttr_ref: ModalRef | null = null;
  var customAttr_children = customAttr?.children;

  var open_signal = createSignal(false);
  var open = open_signal[0];
  var setOpen = open_signal[1];

  var shouldCloseOnBackgroundClick = () =>
    props?.shouldCloseOnBackgroundClick == null
      ? true
      : props.shouldCloseOnBackgroundClick;

  var innerRef: ModalRef | null = null;

  var openEvent = new CustomEvent('open');

  var onOpen: EventListenerOrEventListenerObject = function (
    this: Element,
    event
  ) {
    var prop_onOpen = props?.onOpen;

    setOpen(true);

    if (prop_onOpen != null) {
      if (typeof prop_onOpen === 'function') {
        prop_onOpen(event as any);
      }

      if (isArray(prop_onOpen)) {
        // handler(data, event);
        prop_onOpen[0](prop_onOpen[1], event);
      }
    }
  };

  var onClick: JSX.EventHandler<HTMLDialogElement, MouseEvent> = (event) => {
    var attr_onClick = attrs?.onClick;
    var target = event.target as HTMLElement;

    if (
      event.offsetX < 0 ||
      event.offsetX > target.offsetWidth ||
      event.offsetY < 0 ||
      event.offsetY > target.offsetHeight
    ) {
      if (shouldCloseOnBackgroundClick()) {
        innerRef!.close();
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
      }
    }

    if (attr_onClick != null) {
      if (typeof attr_onClick === 'function') {
        attr_onClick(event);
      }

      if (isArray(attr_onClick)) {
        // handler(data, event);
        attr_onClick[0](attr_onClick[1], event);
      }
    }
  };

  var onClose: JSX.EventHandler<HTMLDialogElement, Event> = (event) => {
    var attr_OnClose = attrs?.onClose;

    setOpen(false);

    if (attr_OnClose != null) {
      if (typeof attr_OnClose === 'function') {
        attr_OnClose(event);
      }

      if (isArray(attr_OnClose)) {
        // handler(data, event);
        attr_OnClose[0](attr_OnClose[1], event);
      }
    }
  };

  var ref = (element: HTMLDialogElement) => {
    // modalRef = element;
    innerRef = element;

    var showModal = element.showModal;
    element.showModal = function () {
      showModal.call(this);

      this.dispatchEvent(openEvent);
    };

    // var proxyfiedElement = new Proxy(element, {
    //   get(target, property, receiver) {
    //     if (property === 'open') {
    //       return open;
    //     }

    //     if (property === 'showModal') {
    //       element.dispatchEvent(openEvent);

    //       setOpen(true);

    //       return target[property].bind(target);
    //     }

    //     var value = Reflect.get(target, property, target);

    //     return value;
    //   },
    // });

    // modalRef = proxyfiedElement;

    // console.log({ modalRef, proxyfiedElement });

    if (customAttr?.ref != null) {
      // Reflect.apply(customAttr?.ref as any, undefined, [proxyfiedElement]);
      Reflect.apply(customAttr?.ref as any, undefined, [element]);
    }
  };

  var children =
    typeof customAttr_children === 'function'
      ? customAttr_children({ open })
      : customAttr_children;

  onMount(() => {
    // var showModal = innerRef!.showModal;
    // innerRef!.showModal = function () {
    //   showModal.call(this);

    //   this.dispatchEvent(openEvent);

    //   setOpen(true);
    // };
    innerRef!.addEventListener('open', onOpen);
  });

  onCleanup(() => {
    innerRef!.removeEventListener('open', onOpen);
  });

  createEffect(() => {
    console.log(open());
  });

  return (
    <dialog
      {...attrs}
      classList={customAttr?.classList}
      $ServerOnly={customAttr?.$ServerOnly}
      ref={ref}
      class={`${attrs?.class || ''} solid-js-modal`}
      role={attrs?.role || 'dialog'}
      aria-modal={attrs?.['aria-modal'] || true}
      onClick={(event) => {
        onClick(event);
      }}
      onClose={(event) => {
        onClose(event);
      }}
      /* ------------------------- omitted attrs ------------------------- */
      open={null}
      /* ------------------------- omitted attrs ------------------------- */
    >
      {children}
    </dialog>
  );
};
