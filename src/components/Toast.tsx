import styled from "styled-components";
import alertIcon from "@/image/icons/alertCircleRed.svg";
import { B4 } from "@/style/font";

interface ToastProps {
  text: string;
}

const Toast: React.FC<ToastProps> = ({ text }) => {
  return (
    <StToast>
      <img src={alertIcon} alt="alert" />
      <span>{text}</span>
    </StToast>
  );
};

const StToast = styled.div`
  position: fixed;
  top: var(--spacing_24);
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
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
