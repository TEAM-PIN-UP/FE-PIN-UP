import { H4, H5 } from "@/style/font";
import styled from "styled-components";
import camera from "@/image/icons/camera.svg";

const PhotoUpload = () => {
  return (
    <StPhotoUpload>
      <p className="title">사진 업로드</p>
      <div className="cardBox">
        <label htmlFor="photoInput">
          <div className="defaultCard">
            <img src={camera} />
            <p className="score">
              <span>0</span>
              <span>/</span>
              <span>5</span>
            </p>
          </div>
        </label>
        <input type="file" id="photoInput" />
      </div>
    </StPhotoUpload>
  );
};

const StPhotoUpload = styled.div`
  display: grid;
  gap: 12px;
  .title {
    ${H4}
  }
  .cardBox {
    display: flex;
    .defaultCard {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      width: 100px;
      height: 100px;
      border-radius: 10px;
      background-color: var(--neutral_50);
      cursor: pointer;
      .score {
        display: flex;
        gap: 1px;
        text-align: center;
        ${H5}
        color : var(--neutral_300);
      }
    }
    input {
      display: none;
    }
  }
`;

export default PhotoUpload;
