import Header from "@/components/Header";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StDiv>
      <Header>
        <Header.Left>
          <button onClick={() => navigate(-1)} className="back-button">
            <img src={chevronLeft} alt="뒤로 가기" />
          </button>
        </Header.Left>
      </Header>
      <div>개인정보 처리방침</div>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 44px;
  box-sizing: border-box;

  .back-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0px;
  }
`;

export default PrivacyPolicy;
