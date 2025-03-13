import { Modal as BaseModal } from './modal/modal.component';
import { ModalTracker } from './modal/modal-tracker.component';
import { ModalRef } from './modal/modal.types';
import { createEffect, Show } from 'solid-js';
import { useModal } from './modal/modal.hook';

// var Modal: typeof BaseModal = (props: any) => {
//   return (
//     <ModalTracker>
//       <BaseModal {...props} />
//     </ModalTracker>
//   );
// };

var Section1 = () => {
  var modalRef: ModalRef = null as any;

  var currentModal = useModal();
  // @ts-ignore
  window.currentModal = currentModal;

  createEffect(() => {
    console.log({ modalRef });
  });

  return (
    <section>
      <h1>Modal 1 test</h1>
      {/* <div>state: {`${modalRef?.open()}`}</div> */}

      <button
        type="button"
        onClick={() => {
          console.log(909090, modalRef.showModal, modalRef.open);

          modalRef.showModal();
        }}
      >
        show
      </button>

      <ModalTracker name="testModal1">
        <BaseModal
          ref={modalRef}
          onOpen={() => {
            // console.log({ modalRef, args });
          }}
        >
          {(args) => {
            console.log('modal child:', args);

            return (
              <Show when={args.open()}>
                {/* <Show when={true}> */}
                <div>
                  {/* <div>{`${args.open()}`}</div> */}

                  <hr />

                  <h1>test1</h1>
                  <button
                    type="button"
                    onClick={(event) => {
                      var ref = event.target.closest(
                        'dialog[role="dialog"]'
                      ) as HTMLDialogElement;

                      console.log({ ref });

                      ref.close();
                    }}
                  >
                    close
                  </button>
                </div>
              </Show>
            );
          }}
        </BaseModal>
      </ModalTracker>
    </section>
  );
};

export default () => {
  return (
    <main>
      <Section1 />
    </main>
  );
};
