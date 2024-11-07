import React from "react";
import { styled } from "styled-components";

import checkActive from "@/image/icons/checkActive.svg";
import checkInactive from "@/image/icons/checkInactive.svg";
import chevronRight from "@/image/icons/chevronRight.svg";
import { StB3 } from "../typography/StText";

interface TosItemProps {
  agreed: boolean;
  onClick: () => void;
  itemName: string;
}

const TosItem: React.FC<TosItemProps> = ({ agreed, onClick, itemName }) => {
  return (
    <TosRow>
      <StAgreeOne onClick={onClick}>
        {agreed ? <StIcon src={checkActive} /> : <StIcon src={checkInactive} />}
        <StB3>{itemName}</StB3>
      </StAgreeOne>
      <StReadTos>
        <img src={chevronRight} />
      </StReadTos>
    </TosRow>
  );
};

const TosRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  height: 20px;
  padding: 0px 20px;
  margin-bottom: var(--spacing_20);
`;

const StAgreeOne = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  gap: var(--spacing_12);
  margin: 0px;
  padding: 0px;
  border: none;
  cursor: pointer;
`;

const StIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const StReadTos = styled.button`
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
`;

export default TosItem;
