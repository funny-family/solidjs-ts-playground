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

export var Modal: ModalComponent = (attrsAndProps) => {
  var splittedProps = splitProps(attrsAndProps, [
    'shouldCloseOnBackgroundClick',
    'onOpen',
  ]);
  var props = splittedProps[0];
  var attrs = splittedProps[1];

  var attr_children = attrs?.children;
  var children = toChildren(() => attrs?.children);
  var attr_open = attrs?.open;

  var attr_signal_open = createSignal(attr_open == null ? false : attr_open);
  var open = attr_signal_open[0];
  var setOpen = attr_signal_open[1];

  var shouldCloseOnBackgroundClick = () =>
    props?.shouldCloseOnBackgroundClick == null
      ? true
      : props.shouldCloseOnBackgroundClick;

  var ref = attrs?.ref as ModalRef;

  var openEvent = new CustomEvent('open');

  var onOpen: EventListenerOrEventListenerObject = function (
    this: Element,
    event
  ) {
    var prop_onOpen = props?.onOpen;

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
        ref.close();
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

  createEffect(() => {
    console.log('open:', open());
  });

  createEffect(
    on(children, (v) => {
      console.log(v);
    })
  );

  onMount(() => {
    var showModal = ref.showModal;
    ref.showModal = function () {
      showModal.call(this);

      this.dispatchEvent(openEvent);
    };
    ref.addEventListener('open', onOpen);
  });

  onCleanup(() => {
    ref.removeEventListener('open', onOpen);
  });

  return (
    <dialog
      {...attrs}
      ref={(el) => (ref = el)}
      class={`${attrs?.class || ''} solid-js-modal`}
      role={attrs?.role || 'dialog'}
      aria-modal={attrs?.['aria-modal'] || true}
      onClick={(event) => {
        onClick(event);
      }}
      // /* ------------------------- omitted attrs ------------------------- */
      open={open()}
      // /* ------------------------- omitted attrs ------------------------- */
    >
      {typeof attr_children === 'function' ? attr_children() : attr_children}
    </dialog>
  );
};
