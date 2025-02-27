import Button from "@/components/Button";
import Header from "@/components/Header";
import camera from "@/image/icons/camera.svg";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import { H3 } from "@/style/font";
import checkImageValidity from "@/utils/checkImageValidity";
import { downscaleImage } from "@/utils/downscaleImage";
import useToastPopup from "@/utils/toastPopup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EditorPostPage = () => {
  const navigate = useNavigate();
  const toast = useToastPopup();
  const [image, setImage] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) return;

    if (!checkImageValidity(file)) {
      toast("jpeg 또는 png 형식의 이미지를 올려주세요.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageUrl = reader.result;
      if (typeof imageUrl === "string") {
        const compressedImage = await downscaleImage({
          image: imageUrl,
          returnFormat: "base64",
        });
        setImage(compressedImage as string);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <StDiv>
      <Header>
        <Header.Left>
          <img
            className="back-button"
            src={chevronLeft}
            onClick={() => navigate(-1)}
          />
        </Header.Left>
        <Header.Center>
          <span className="header-title">아티클 업로드</span>
        </Header.Center>
      </Header>

      {!image && (
        <div className="upload-section">
          <div className="upload">
            <input
              className="input"
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleChange}
            />
            <img className="upload-icon" src={camera} />
          </div>
        </div>
      )}
      {image && <img className="image-preview" src={image} />}

      <div className="post">
        <Button
          className="post-button"
          size="full"
          onClick={() => {}}
          active={!!image}
        >
          등록하기
        </Button>
      </div>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .back-button {
    cursor: pointer;
  }
  .header-title {
    ${H3}
  }

  .upload-section {
    width: 100%;
    box-sizing: border-box;
    padding: var(--spacing_20);
    display: flex;
    flex-grow: 1;
    align-items: start;

    .upload {
      position: relative;
      width: 100%;
      aspect-ratio: calc(16 / 9);
      background-color: var(--neutral_100);
      border-radius: var(--radius_12);

      .upload-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 32px;
        height: 32px;
      }

      .input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        z-index: 10;
      }
    }
  }

  .image-preview {
    width: 100%;
    object-fit: contain;
    display: flex;
    flex-grow: 1;
  }

  .post {
    width: 100%;
    box-sizing: border-box;
    padding: 8px var(--spacing_20);
    border-top: 1px solid var(--neutral_100);

    .post-button {
    }
  }
`;

export default EditorPostPage;
