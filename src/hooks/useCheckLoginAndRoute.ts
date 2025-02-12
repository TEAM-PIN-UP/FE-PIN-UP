import checkLogin from "@/utils/checkLogin";
import useToastPopup from "@/utils/toastPopup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckLoginAndRoute = (options?: {
  toastText?: string;
  path?: string;
}) => {
  const navigate = useNavigate();
  const toast = useToastPopup();

  const toastText = options?.toastText ?? "로그인 후 이용해 주세요.";
  const path = options?.path ?? "/signup";

  useEffect(() => {
    const isSignedIn = checkLogin();
    if (!isSignedIn) {
      toast(toastText);
      navigate(path);
    }
  }, [toastText, path, toast, navigate]);
};

export default useCheckLoginAndRoute;
