import styled from "styled-components";
import alertIcon from "@/image/icons/alertCircleRed.svg";
import { B4 } from "@/style/font";
import { useEffect } from "react";

interface ToastProps {
  text: string;
  toastOn: boolean;
  setToastOn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ToastStyle {
  toastOn: boolean;
}

const Toast: React.FC<ToastProps> = ({ text, toastOn, setToastOn }) => {
  useEffect(() => {
    if (toastOn) {
      const timer = setTimeout(() => {
        setToastOn(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastOn]);

  return (
    <StToast toastOn={toastOn}>
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
  opacity: ${(props) => (props.toastOn ? 1 : 0)};
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
`;

export default Toast;
