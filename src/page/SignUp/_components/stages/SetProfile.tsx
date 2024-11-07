import styled from "styled-components";

import Button from "@/components/Button";
import camera from "../../_icons/camera.svg";
import StGap from "../typography/StGap";
import StGlue from "../typography/StGlue";
import { StH1 } from "../typography/StText";
import StTextContainer from "../typography/StTextContainer";
import { StageProps } from "./StageProps";

const SetProfile: React.FC<StageProps> = ({ data, updateData, onNext }) => {
  return (
    <>
      <StTextContainer>
        <StH1>프로필에 사용 될</StH1>
        <StGap height="8px" />
        <StH1>이미지를 골라주세요.</StH1>
      </StTextContainer>
      <StGap height="64px" />

      <StImagePicker>
        <img src={camera} style={{ width: "24px", height: "24px" }} />
      </StImagePicker>
      <StGlue />

      <Button
        size="full"
        onClick={() => {
          console.log(data);
          onNext();
        }}
      >
        사진 선택하기
      </Button>
      <StGap height="16px" />
      <StButton
        onClick={() => {
          updateData({ profileImage: "" });
          console.log(data);
          onNext();
        }}
      >
        건너뛰기
      </StButton>
    </>
  );
};

const StImagePicker = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: var(--neutral_100);
  border: none;
  border-radius: var(--radius_circle);
`;

const StButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0px 4px;
  cursor: pointer;
`;

export default SetProfile;
