import { B4 } from "@/style/font";
import React, { useState } from "react";
import styled from "styled-components";

const UserIntroInput: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <StDiv>
      {!isActive && (
        <div className="placeholder">
          <span className="b4">나를 한 줄로 소개해 보세요</span>
        </div>
      )}
      <input
        type="text"
        className="input"
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
    </StDiv>
  );
};

const StDiv = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin: 0px var(--spacing_20);

  .placeholder {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--neutral_400);
    left: var(--spacing_16);
  }

  .input {
    border: 1px solid var(--neutral_200);
    border-radius: var(--radius_8);
    width: 100%;
    padding: var(--spacing_16);
    background-color: transparent;
    z-index: 10;
  }

  .b4 {
    ${B4}
  }
`;

export default UserIntroInput;
