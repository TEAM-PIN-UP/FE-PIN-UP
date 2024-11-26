import { useEffect } from "react";
import styled from "styled-components";

import alertIcon from "@/image/icons/alertCircleRed.svg";
import { useToastStore } from "@/store";
import { B4 } from "@/style/font";

interface ToastStyle {
  $toastOn: boolean;
}

const Toast: React.FC = () => {
  const { toastOn, pop, text } = useToastStore();

  useEffect(() => {
    if (toastOn) {
      const timer = setTimeout(() => {
        pop(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [pop, toastOn]);

  return (
    <StToast $toastOn={toastOn}>
      <img src={alertIcon} alt="alert" />
      <span>{text}</span>
    </StToast>
  );
};

const StToast = styled.div<ToastStyle>`
  position: fixed;
  top: var(--spacing_24);
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  opacity: ${(props) => (props.$toastOn ? 1 : 0)};
  pointer-events: ${(props) => (props.$toastOn ? "auto" : "none")};
  transition: opacity 1s;
  align-items: center;
  width: max-content;
  text-align: left;
  ${B4}
  padding: var(--spacing_12) var(--spacing_16);
  gap: var(--spacing_12);
  background-color: var(--transparent_70);
  color: var(--white);
  border-radius: var(--radius_circle);
  span {
    max-width: 255px;
  }
  z-index: 50;
`;

export default Toast;
