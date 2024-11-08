import styled from "styled-components";

import Button from "@/components/Button";
import camera from "../../_icons/camera.svg";
import StGap from "../typography/StGap";
import StGlue from "../typography/StGlue";
import StTextContainer from "../typography/StTextContainer";
import { StageProps } from "./StageProps";

const SetProfile: React.FC<StageProps> = ({ data, updateData, onNext }) => {
  return (
    <StDiv>
      <StTextContainer>
        <div className="h1">프로필에 사용될</div>
        <div className="h1">이미지를 골라주세요.</div>
      </StTextContainer>
      <StGap height="64px" />

      <button className="image-picker">
        <img className="camera" src={camera} />
      </button>
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
      <button
        className="skip-button"
        onClick={() => {
          updateData({ profileImage: "" });
          console.log(data);
          onNext();
        }}
      >
        건너뛰기
      </button>
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

  .image-picker {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background-color: var(--neutral_100);
    border: none;
    border-radius: var(--radius_circle);
    cursor: pointer;

    .camera {
      width: "24px";
      height: "24px";
    }
  }

  .skip-button {
    border: none;
    background-color: transparent;
    padding: 0px 4px;
    cursor: pointer;
  }
`;

export default SetProfile;
