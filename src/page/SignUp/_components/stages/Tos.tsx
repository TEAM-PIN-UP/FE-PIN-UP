import { useState } from "react";
import styled from "styled-components";

import Button from "@/components/Button";
import checkActive from "@/image/icons/checkActive.svg";
import checkInactive from "@/image/icons/checkInactive.svg";
import { AgreementKey } from "../../SignUpInterface";
import StGap from "../typography/StGap";
import StGlue from "../typography/StGlue";
import StTextContainer from "../typography/StTextContainer";
import { StageProps } from "./StageProps";
import TosItem from "./TosItem";

const Tos: React.FC<StageProps> = ({ data, updateData, onNext }) => {
  const [agreements, setAgreements] = useState<Set<AgreementKey>>(new Set());

  const handleToggleAgreement = (key: AgreementKey) => {
    setAgreements((prev) => {
      const newAgreements = new Set(prev);
      if (newAgreements.has(key)) {
        newAgreements.delete(key);
      } else {
        newAgreements.add(key);
      }
      return newAgreements;
    });
  };

  const handleAgreeAll = () => {
    setAgreements(new Set(["tos", "personalInfo", "marketing"]));
  };

  const isRequiredAgreed =
    agreements.has("tos") && agreements.has("personalInfo");
  const isAllAgreed = isRequiredAgreed && agreements.has("marketing");

  return (
    <StDiv>
      <StTextContainer>
        <div className="b1">약관동의</div>
        <div className="c1">핀업 앱 이용을 위해서는 약관동의가 필요해요.</div>
        <StGap height="28px" />

        <button className="agree-all" onClick={handleAgreeAll}>
          <img
            className="check-mark"
            src={isAllAgreed ? checkActive : checkInactive}
          />
          <div className="b3-body">전체 동의</div>
        </button>
      </StTextContainer>
      <StGap height="24px" />

      <TosItem
        agreed={agreements.has("tos")}
        onClick={() => handleToggleAgreement("tos")}
        itemName="핀업 이용약관 동의 (필수)"
      />
      <TosItem
        agreed={agreements.has("personalInfo")}
        onClick={() => handleToggleAgreement("personalInfo")}
        itemName="개인정보 수집 및 이용 동의 (필수)"
      />
      <TosItem
        agreed={agreements.has("marketing")}
        onClick={() => handleToggleAgreement("marketing")}
        itemName="마케팅 정보 수신 동의 (선택)"
      />
      <StGlue />

      <Button
        size="full"
        active={isRequiredAgreed}
        onClick={() => {
          updateData({ agreedToTerms: Array.from(agreements) });
          console.log(data);
          onNext();
        }}
      >
        다음
      </Button>
    </StDiv>
  );
};

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .agree-all {
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
  }

  .check-mark {
    width: 20px;
    height: 20px;
  }
`;

export default Tos;
