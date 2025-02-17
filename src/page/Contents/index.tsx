import useCheckLoginAndRoute from "@/hooks/useCheckLoginAndRoute";
import { ModalProps } from "@/store/modalStore";
import useModalPopup from "@/utils/modalPopup";

const ContentsPage = () => {
  useCheckLoginAndRoute();

  const { openModal, closeModal } = useModalPopup();

  const modalData: ModalProps = {
    type: "ok",
    title: "확인 모달",
    body: ["이 모달은", "확인만 있어요!"],
    okButtonText: "확인",
    onOkButtonClick: () => {
      closeModal();
    },
  };

  const okModal = () => {
    openModal(modalData);
  };

  const cancelOkModal = () => {
    openModal({
      type: "cancel-ok",
      title: "취소와 확인 모달",
      body: ["이 모달에는", "확인과 취소가 있어요!"],
      okButtonText: "확인",
      onOkButtonClick: () => {
        closeModal();
      },
      cancelButtonText: "취소",
      onCancelButtonClick: () => {
        closeModal();
      },
    });
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <button onClick={okModal}>정보 확인 모달</button>

      <button onClick={cancelOkModal}>의사 확인 모달</button>
    </div>
  );
};

export default ContentsPage;
