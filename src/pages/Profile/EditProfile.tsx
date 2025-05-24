import { CustomAxiosError } from "@/api/errorHandler";
import apiAxios from "@/api/interceptors";
import putApi from "@/api/putApi";
import Header from "@/components/Header";
import ProfileImagePicker from "@/components/ProfileImagePicker";
import useMyProfileDetails from "@/hooks/api/profile/useMyProfileDetails";
import camera from "@/images/icons/camera.svg";
import chevronLeft from "@/images/icons/chevronLeft.svg";
import { paths } from "@/routes/paths";
import { ModalProps } from "@/stores/modalStore";
import { B3, B5, H3, H4 } from "@/styles/font";
import useModalPopup from "@/utils/modalPopup";
import useToastPopup from "@/utils/toastPopup";
import uploadImage from "@/utils/uploadImage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToastPopup();

  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const lowerCharLimit = 2;
  const upperCharLimit = 12;
  const { openModal, closeModal } = useModalPopup();

  const { data: myDetails, isLoading } = useMyProfileDetails();

  useEffect(() => {
    // Read values from backend on page load
    if (isLoading) return;
    setProfileImage(myDetails!.memberResponse.profilePictureUrl);
    setName(myDetails!.memberResponse.nickname);
    setBio(myDetails!.memberResponse.bio);
  }, [isLoading, myDetails]);

  const handleSubmit = async () => {
    const regex =
      /^[a-zA-Z\u1100-\u1112\u1161-\u1175\u3130-\u318F\uAC00-\uD7A3]*$/;
    try {
      if (name.length > upperCharLimit) throw Error("닉네임이 너무 길어요.");
      if (name.length < lowerCharLimit) throw Error("닉네임이 너무 짧아요.");
      if (!regex.test(name))
        throw Error("닉네임은 한글과 영문만 입력해주세요.");

      const formData = new FormData();
      formData.append(
        "updateProfileRequest",
        JSON.stringify({ nickname: name, bio: bio })
      );
      if (!profileImage.startsWith("https")) {
        const profileImageBlob = await (await fetch(profileImage)).blob();
        const mimeType = profileImage.split(";")[0].split(":")[1];
        const fileExtension = mimeType === "image/png" ? "png" : "jpg";
        formData.append(
          "multipartFile",
          profileImageBlob,
          `profile.${fileExtension}`
        );
      } else {
        formData.append("multipartFile", "");
      }

      try {
        await putApi.editProfile(formData);

        toast("닉네임이 변경되었어요.");
        navigate(-1);
      } catch (error) {
        toast(String((error as CustomAxiosError).response?.data.message));
      }
    } catch (error) {
      toast((error as Error).message);
    }
  };

  const deleteAccountModal: ModalProps = {
    type: "cancel-ok",
    title: "핀업을 탈퇴하시겠어요?",
    body: [
      "탈퇴 시 작성한 모든 내용이 삭제되며,",
      "삭제 된 정보는 복구가 불가능해요.",
    ],
    okButtonText: "탈퇴",
    onOkButtonClick: async () => {
      try {
        await apiAxios.delete(`/api/members`);
        localStorage.clear();
        navigate(paths.signup);
      } catch (error) {
        console.error("Delete request failed:", error);
        toast("회원탈퇴 중 오류가 발생했어요.");
      } finally {
        closeModal();
      }
    },
    cancelButtonText: "취소",
    onCancelButtonClick: () => {
      closeModal();
    },
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
          <button className="save-button" onClick={handleSubmit}>
            완료
          </button>
        </Header.Right>
      </Header>

      <div className="contents">
        <div className="image-picker">
          {!profileImage && (
            <div className="overlay" style={{ pointerEvents: "none" }} />
          )}
          <ProfileImagePicker
            imageUrl={profileImage}
            onImageChange={(image) =>
              uploadImage(image, (loadedImageUrl) =>
                setProfileImage(loadedImageUrl)
              )
            }
            onImageRemove={() => setProfileImage("")}
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
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </div>
          <div className="input">
            <span className="input-label">소개</span>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input-field"
              placeholder="소개 입력하기"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </div>
        </div>
        <div className="bottom-row">
          <span className={`info ${isInputFocused ? "" : "active"}`}>
            *닉네임은 30일 마다 변경 가능해요.
          </span>
          <button
            className={`delete-account ${isInputFocused ? "active" : ""}`}
            onClick={() => openModal(deleteAccountModal)}
          >
            회원탈퇴
          </button>
        </div>
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
    padding: 0px;
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

    .bottom-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: var(--spacing_16);

      .info {
        ${B5}
        color: var(--neutral_400);
        text-align: start;
        transition: opacity 0.2s ease;
      }
      .delete-account {
        ${B5}
        background-color: transparent;
        border: none;
        border-bottom: 1px solid var(--neutral_400);
        color: var(--neutral_400);
        cursor: pointer;
        transition: opacity 0.8s ease;
      }
      .active {
        opacity: 0;
        pointer-events: none;
      }
    }
  }
`;

export default EditProfile;
