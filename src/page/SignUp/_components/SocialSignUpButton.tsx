import { H4 } from "@/style/font";
import styled from "styled-components";

interface SocialSignupButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: string;
  color?: string;
  backgroundColor?: string;
}

const SocialSignUpButton: React.FC<SocialSignupButtonProps> = ({
  icon,
  color,
  backgroundColor,
  className,
  style,
  children,
  ...rest
}) => {
  return (
    <StButton
      color={color}
      $backgroundColor={backgroundColor}
      className={className}
      style={style}
      {...rest}
    >
      <StIcon src={icon} />
      {children}
    </StButton>
  );
};

const StButton = styled.button<{ $backgroundColor?: string }>`
  ${H4}
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 52px;
  padding: 16px 8px;
  color: ${({ color }) => (color ? color : "var(--neutral_800)")};
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? $backgroundColor : "var(--neutral_800)"};
  border-radius: var(--radius_circle);
  cursor: pointer;
`;

const StIcon = styled.img`
  position: absolute;
  left: 24px;
  width: 16px;
  height: 16px;
`;

export default SocialSignUpButton;
