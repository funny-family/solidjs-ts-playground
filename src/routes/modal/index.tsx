import { Modal } from './modal/modal.component';
import { ModalRef } from './modal/modal.types';

var Section1 = () => {
  var modalRef: ModalRef = null as any;

  return (
    <section>
      <h1>Modal 1 test</h1>

      <button
        type="button"
        onClick={() => {
          modalRef.showModal();
        }}
      >
        show
      </button>

      <Modal ref={modalRef}>
        <div>
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
      </Modal>
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
