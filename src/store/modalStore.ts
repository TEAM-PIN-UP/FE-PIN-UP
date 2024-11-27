import { create } from "zustand";

type modalType = "ok" | "cancel-ok";

interface ModalPropsBase {
  title: string;
  body: string[];
  type: modalType;
}

interface OkModalProps extends ModalPropsBase {
  type: "ok";
  okButtonText: string;
  onOkButtonClick: () => void;
}

interface CancelOkModalProps extends ModalPropsBase {
  type: "cancel-ok";
  okButtonText: string;
  cancelButtonText: string;
  onOkButtonClick: () => void;
  onCancelButtonClick: () => void;
}

export type ModalProps = OkModalProps | CancelOkModalProps;

type ModalStore = {
  modalOn: boolean;
  title: string;
  body: string[];
  type: "ok" | "cancel-ok";
  okButtonText: string;
  cancelButtonText?: string;
  onOkButtonClick: () => void;
  onCancelButtonClick?: () => void;

  openModal: (props: ModalProps) => void;
  closeModal: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  modalOn: false,
  title: "",
  body: [],
  type: "ok",
  okButtonText: "",
  cancelButtonText: "",
  onOkButtonClick: () => {},
  onCancelButtonClick: () => {},

  openModal: (props) =>
    set(() => ({
      modalOn: true,
      ...props,
    })),

  closeModal: () =>
    set(() => ({
      modalOn: false,
    })),
}));

export default useModalStore;
