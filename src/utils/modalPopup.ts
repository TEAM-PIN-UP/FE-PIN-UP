import { useModalStore } from "@/store";
import { ModalProps } from "@/store/modalStore";
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
