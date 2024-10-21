import { create } from "zustand";

type ToastStore = {
  toastOn: boolean;
  text: string;
  textChange: (prop: string) => void;
  pop: (prop: boolean) => void;
};

const useToastStore = create<ToastStore>()((set) => ({
  toastOn: false,
  text: "",
  textChange: (prop) => set(() => ({ text: prop })),
  pop: (prop) => set(() => ({ toastOn: prop })),
}));

export default useToastStore;
