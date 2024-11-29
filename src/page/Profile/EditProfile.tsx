import Header from "@/components/Header";
import ProfileImagePicker from "@/components/ProfileImagePicker";
import camera from "@/image/icons/camera.svg";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import { B3, B5, H3, H4 } from "@/style/font";
import checkImageValidity from "@/utils/checkImageValidity";
import { cropImage } from "@/utils/cropImage";
import useToastPopup from "@/utils/toastPopup";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToastPopup();

  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");

  useEffect(() => {
    // Read values from backend on page load
    setProfileImage("");
    setName("");
    setIntro("");
    return () => {};
  }, []);

  const handleImageChange = (file: File) => {
    if (file) {
      if (!checkImageValidity(file)) {
        toast("jpeg 또는 png 형식의 이미지를 올려주세요.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = reader.result;
        if (typeof imageUrl === "string") {
          const image = new Image();

          // Load success = valid image
          image.onload = async () => {
            try {
              const croppedImageUrl = await cropImage(imageUrl);
              setProfileImage(croppedImageUrl);
            } catch (error) {
              console.error("Error cropping image: ", error);
            }
          };
          image.onerror = () => {
            toast("jpeg 또는 png 형식의 올바른 이미지 파일을 선택해주세요.");
          };

          // Begin loading image
          image.src = imageUrl;
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const isValid = name.trim().length != 0 && intro.trim().length != 0;
  const handleSubmit = () => {
    // TODO: check validity
    toast("닉네임이 변경 되었어요.");
    // toast("현재 닉네임 변경 가능 기간이 아니에요.");
    // toast("중복되는 닉네임이에요.");
  };

  return (
    <StDiv>
      <Header>
        <Header.Left>
          <button onClick={() => navigate(-1)} className="back-button">
            <img src={chevronLeft} alt="뒤로 가기" />
          </button>
        </Header.Left>
        <Header.Center>
          <span className="header-title">프로필 편집</span>
        </Header.Center>
        <Header.Right>
          <button
            className="save-button"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            완료
          </button>
        </Header.Right>
      </Header>

      <div className="contents">
        <div className="image-picker">
          <div className="overlay" />
          <ProfileImagePicker
            imageUrl={profileImage}
            onImageChange={handleImageChange}
            size="84px"
            placeholderIcon={camera}
          />
        </div>
        <div className="inputs">
          <div className="input">
            <span className="input-label">닉네임</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input">
            <span className="input-label">소개</span>
            <input
              type="text"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              className="input-field"
              placeholder="소개 입력하기"
            />
          </div>
        </div>
        <div className="info">*닉네임은 30일 마다 변경 가능해요.</div>
      </div>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  display: flex;

  .back-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .header-title {
    ${H3}
  }
  .save-button {
    ${H4}
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: var(--neutral_800);
  }
  .save-button:disabled {
    cursor: default;
    color: var(--neutral_400);
    opacity: 0.5;
  }

  .contents {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    align-items: center;
    margin-top: 48px;
    padding: 40px 20px 0px 20px;

    .image-picker {
      position: relative;
      width: 84px;
      height: 84px;
      border-radius: var(--radius_circle);
      cursor: pointer;
      margin-bottom: var(--spacing_24);

      .overlay {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--transparent_50);
        border-radius: var(--radius_circle);
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        z-index: 10;
      }
    }

    .inputs {
      display: flex;
      flex-direction: column;
      width: 100%;

      .input {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: var(--spacing_20);

        .input-label {
          ${B3}
          color: var(--neutral_400);
          width: 36px;
        }
        .input-field {
          ${B3}
          border: none;
          flex-grow: 1;
          border-bottom: 1px solid transparent;
          outline: none;
          padding: var(--spacing_20) 0px;
          transition: border-bottom-color 0.3s ease;
        }
        .input-field:focus {
          border-bottom: 1px solid black;
        }
        .input-field::placeholder {
          color: var(--neutral_400);
        }
      }
    }

    .info {
      ${B5}
      color: var(--neutral_400);
      margin-top: var(--spacing_16);
      text-align: start;
      width: 100%;
    }
  }
`;

export default EditProfile;
