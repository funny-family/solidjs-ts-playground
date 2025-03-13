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

  var shouldCloseOnBackgroundClick = () => {
    // prettier-ignore
    return (
      props?.shouldCloseOnBackgroundClick == null
      ?
      true
      :
      props.shouldCloseOnBackgroundClick
    );
  };

  var innerRef: ModalRef | null = null;

  var openEvent = new CustomEvent('open');

  var onOpen: EventListenerOrEventListenerObject = function (
    this: Element,
    event
  ) {
    const prop_onOpen = props?.onOpen;
    const prop_onOpenExists = prop_onOpen != null;

    // prettier-ignore
    (
      prop_onOpenExists
      &&
      typeof prop_onOpen === 'function'
    ) && (
      prop_onOpen(event as any)
    );

    // prettier-ignore
    (
      prop_onOpenExists
      &&
      isArray(prop_onOpen)
    ) && (
      // handler(data, event);
      prop_onOpen[0](prop_onOpen[1], event)
    );

    setOpen(true);
  };

  var onClick: JSX.EventHandler<HTMLDialogElement, MouseEvent> = (event) => {
    var attr_onClick = attrs?.onClick;
    const target = event.target as HTMLElement;

    // prettier-ignore
    const isInBackdropArea = (
      event.offsetX < 0
      ||
      event.offsetX > target.offsetWidth
      ||
      event.offsetY < 0
      ||
      event.offsetY > target.offsetHeight
    );

    // prettier-ignore
    isInBackdropArea
    &&
    shouldCloseOnBackgroundClick()
    && (
      innerRef!.close(),
      event.preventDefault(),
      event.stopImmediatePropagation(),
      event.stopPropagation(),
      console.log(1231321)
    );

    const attr_onClickExists = attr_onClick != null;

    // prettier-ignore
    (
      attr_onClickExists
      &&
      typeof attr_onClick === 'function'
    ) && (
      attr_onClick(event)
    );

    // prettier-ignore
    (
      attr_onClickExists
      &&
      isArray(attr_onClick)
    ) && (
        // handler(data, event);
      attr_onClick[0](attr_onClick[1], event)
    );
  };

  var onClose: JSX.EventHandler<HTMLDialogElement, Event> = (event) => {
    const attr_OnClose = attrs?.onClose;
    const attr_OnCloseExists = attr_OnClose != null;

    // prettier-ignore
    (
      attr_OnCloseExists
      &&
      typeof attr_OnClose === 'function'
    ) && (
      attr_OnClose(event)
    );

    // prettier-ignore
    (
      attr_OnCloseExists
      &&
      isArray(attr_OnClose)
    ) && (
      // handler(data, event);
      attr_OnClose[0](attr_OnClose[1], event)
    );

    setOpen(false);
  };

  var ref = (element: HTMLDialogElement) => {
    // modalRef = element;
    innerRef = element;

    const showModal = element.showModal;
    element.showModal = function () {
      showModal.call(this);

      this.dispatchEvent(openEvent);
    };

    // prettier-ignore
    customAttr?.ref != null && (
      Reflect.apply(customAttr?.ref as any, undefined, [element])
    );
  };

  var children = toChildren(() => {
    // prettier-ignore
    return (
      typeof customAttr_children === 'function'
      ?
      customAttr_children({ open })
      :
      customAttr_children
    );
  });

  onMount(() => {
    innerRef!.addEventListener('open', onOpen);
  });

  onCleanup(() => {
    innerRef!.removeEventListener('open', onOpen);
  });

  createEffect(() => {
    console.log(open(), innerRef);
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
      {children()}
    </dialog>
  );
};
