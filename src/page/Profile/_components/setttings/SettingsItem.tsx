import chevronRight from "@/image/icons/chevronRightBlack.svg";
import { H4, H6 } from "@/style/font";
import React from "react";
import styled from "styled-components";

interface SettingsItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title: string;
  type: "arrow" | "text";
  description?: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  type,
  description,
  ...rest
}) => {
  return (
    <StDiv {...rest}>
      <p className="title">{title}</p>
      {type === "arrow" && <img src={chevronRight} />}
      {type === "text" && (
        <p className="description-stack">
          {description?.split("\n").map((t) => (
            <p className="description">{t}</p>
          ))}
        </p>
      )}
    </StDiv>
  );
};

const StDiv = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--neutral_100);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;

  .title {
    ${H4}
    display: flex;
    align-items: center;
  }
  .description-stack {
    display: flex;
    flex-direction: column;
  }
  .description {
    ${H6}
    display: flex;
    color: var(--neutral_400);
    justify-content: end;
  }
`;
export default SettingsItem;
