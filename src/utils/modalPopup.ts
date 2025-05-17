import { useModalStore } from "@/stores";
import { ModalProps } from "@/stores/modalStore";
import { useCallback } from "react";

const useModalPopup = () => {
  const { openModal: openModalStore, closeModal: closeModalStore } =
    useModalStore();

  const openModal = useCallback(
    (props: ModalProps) => {
      openModalStore(props);
    },
    [openModalStore]
  );

  const closeModal = useCallback(() => {
    closeModalStore();
  }, [closeModalStore]);

  return { openModal, closeModal };
};

export default useModalPopup;
