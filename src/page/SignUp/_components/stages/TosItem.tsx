import React from "react";
import { styled } from "styled-components";

import checkActive from "@/image/icons/checkActive.svg";
import checkInactive from "@/image/icons/checkInactive.svg";
import chevronRight from "@/image/icons/chevronRight.svg";
import StTextContainer from "../typography/StTextContainer";

interface TosItemProps {
  agreed: boolean;
  onClick: () => void;
  itemName: string;
}

const TosItem: React.FC<TosItemProps> = ({ agreed, onClick, itemName }) => {
  return (
    <StDiv>
      <StTextContainer>
        <button className="agree-one" onClick={onClick}>
          <img
            className="check-mark"
            src={agreed ? checkActive : checkInactive}
            alt={agreed ? "동의 철회" : "동의"}
          />
          <div className="b3">{itemName}</div>
        </button>
      </StTextContainer>
      <button className="read-tos">
        <img src={chevronRight} alt="약관 읽기" />
      </button>
    </StDiv>
  );
};

const StDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  height: 20px;
  padding: 0px 20px;
  margin-bottom: var(--spacing_20);

  .agree-one {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    gap: var(--spacing_12);
    margin: 0px;
    padding: 0px;
    border: none;
    cursor: pointer;
  }

  .check-mark {
    width: 20px;
    height: 20px;
  }

  .read-tos {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    background-color: transparent;
    box-sizing: content-box;
    margin: 0px;
    padding: 2px;
    border: none;
    cursor: pointer;
  }
`;

export default TosItem;
