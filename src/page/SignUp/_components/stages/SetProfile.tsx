import { useRef } from "react";
import styled from "styled-components";

import Button from "@/components/Button";
import { B3 } from "@/style/font";
import { cropImage } from "@/utils/cropImage";
import camera from "../../_icons/camera.svg";
import StGap from "../typography/StGap";
import StGlue from "../typography/StGlue";
import StTextContainer from "../typography/StTextContainer";
import { StageProps } from "./StageProps";

const SetProfile: React.FC<StageProps> = ({ data, updateData, onNext }) => {
  const isValidProfileImage = data.profileImage && data.profileImage !== "";
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = reader.result;
        if (typeof imageUrl === "string") {
          try {
            const croppedImageUrl = await cropImage(imageUrl);
            updateData({ profileImage: croppedImageUrl });
          } catch (error) {
            console.error("Error cropping image: ", error);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <StDiv>
      <StTextContainer>
        {!isValidProfileImage && (
          <>
            <div className="h1">프로필에 사용될</div>
            <div className="h1">이미지를 골라주세요.</div>
          </>
        )}
        {isValidProfileImage && (
          <>
            <div className="h1">멋진 프로필</div>
            <div className="h1">사진이 등록되었어요!</div>
          </>
        )}
      </StTextContainer>
      <StGap height="64px" />

      <button
        className="image-picker"
        style={{
          backgroundImage: isValidProfileImage
            ? `url(${data.profileImage})`
            : "none",
        }}
      >
        {!isValidProfileImage && <img className="camera-icon" src={camera} />}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="image-input"
          onChange={handleImageChange}
        />
      </button>
      {isValidProfileImage && <span className="username">{data.name}</span>}
      <StGlue />

      {!isValidProfileImage && (
        <>
          <Button
            size="full"
            onClick={() => {
              if (fileInputRef.current) fileInputRef.current.click();
            }}
          >
            사진 선택하기
          </Button>
          <StGap height="16px" />
          <button
            className="skip-button"
            onClick={() => {
              console.log(data);
              onNext();
            }}
          >
            건너뛰기
          </button>
        </>
      )}
      {isValidProfileImage && (
        <Button
          size="full"
          onClick={() => {
            console.log(data);
            onNext();
          }}
        >
          다음
        </Button>
      )}
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
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background-color: var(--neutral_100);
    background-size: cover;
    background-position: center;
    border: none;
    border-radius: var(--radius_circle);
    cursor: pointer;

    .camera-icon {
      width: 24px;
      height: 24px;
    }

    .image-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }

  .username {
    ${B3}
    margin-top: var(--spacing_16);
  }

  .skip-button {
    border: none;
    background-color: transparent;
    padding: 0px 4px;
    cursor: pointer;
  }
`;

export default SetProfile;
