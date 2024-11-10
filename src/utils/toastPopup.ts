import { useToastStore } from "@/store";
import { useCallback } from "react";

const useToastPopup = () => {
  const { textChange, pop } = useToastStore();

  const triggerToast = useCallback(
    (text: string) => {
      textChange(text);
      pop(true);
    },
    [textChange, pop]
  );
  return triggerToast;
};

export default useToastPopup;
