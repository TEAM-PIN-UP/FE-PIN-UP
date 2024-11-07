import { useState } from "react";
import styled from "styled-components";

import Button from "@/components/Button";
import checkActive from "@/image/icons/checkActive.svg";
import checkInactive from "@/image/icons/checkInactive.svg";
import { Terms } from "../../SignUpInterface";
import StGap from "../typography/StGap";
import StGlue from "../typography/StGlue";
import { StB1, StB3, StC1 } from "../typography/StText";
import StTextContainer from "../typography/StTextContainer";
import { StageProps } from "./StageProps";
import TosItem from "./TosItem";

const Tos: React.FC<StageProps> = ({ data, updateData, onNext }) => {
  const [agreements, setAgreements] = useState<Terms>({
    tos: false,
    personalInfo: false,
    marketing: false,
  });

  const handleToggleAgreement = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAgreeAll = () => {
    setAgreements({
      tos: true,
      personalInfo: true,
      marketing: true,
    });
  };

  const isRequiredAgreed = agreements.tos && agreements.personalInfo;
  const isAllAgreed = isRequiredAgreed && agreements.marketing;

  return (
    <>
      <StTextContainer>
        <StB1>약관동의</StB1>
        <StGap height="12px" />
        <StC1>핀업 앱 이용을 위해서는 약관동의가 필요해요.</StC1>
      </StTextContainer>
      <StGap height="28px" />

      <StAgreeAll onClick={handleAgreeAll}>
        {isAllAgreed ? (
          <StIcon src={checkActive} />
        ) : (
          <StIcon src={checkInactive} />
        )}
        <StB3>전체 동의</StB3>
      </StAgreeAll>
      <StGap height="24px" />

      <TosItem
        agreed={agreements.tos}
        onClick={() => handleToggleAgreement("tos")}
        itemName="핀업 이용약관 동의 (필수)"
      />
      <TosItem
        agreed={agreements.personalInfo}
        onClick={() => handleToggleAgreement("personalInfo")}
        itemName="개인정보 수집 및 이용 동의 (필수)"
      />
      <TosItem
        agreed={agreements.marketing}
        onClick={() => handleToggleAgreement("marketing")}
        itemName="마케팅 정보 수신 동의 (선택)"
      />

      <StGlue />
      <Button
        size="full"
        active={isRequiredAgreed}
        onClick={() => {
          updateData({ agreedToTerms: agreements });
          console.log(data);
          onNext();
        }}
      >
        다음
      </Button>
    </>
  );
};

const StAgreeAll = styled.button`
  display: flex;
  align-items: center;
  justify-content: start;
  box-sizing: border-box;
  width: 100%;
  height: 52px;
  margin: 1px;
  padding: var(--spacing_16);
  gap: 12px;
  background-color: transparent;
  border: 1px solid var(--neutral_200);
  border-radius: var(--radius_circle);
  cursor: pointer;
`;

const StIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export default Tos;
