import BasicSwiper from "@/components/BasicSwiper";
import camera from "@/image/icons/camera.svg";
import cancelIcon from "@/image/icons/xCircle.svg";
import { H4, H5 } from "@/style/font";
import { downscaleImage } from "@/utils/downscaleImage";
import useToastPopup from "@/utils/toastPopup";
import styled, { css } from "styled-components";
import { SwiperSlide } from "swiper/react";

interface PhotoUploadProp {
  imageData: File[];
  setImageData: React.Dispatch<React.SetStateAction<File[]>>;
}

const PhotoUpload: React.FC<PhotoUploadProp> = ({
  imageData,
  setImageData,
}) => {
  const toast = useToastPopup();

  /** 드래그 앤 드롭시 페이지 전체에 사진이 퍼지는 것을 방지 */
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files?.length + imageData.length >= 4) {
      toast("사진 업로드는 3장까지만 가능합니다!");
      return;
    }
    setImageData((prev) => [...prev, files[0]]);
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (files?.length + imageData.length >= 4) {
        toast("사진 업로드는 3장까지만 가능합니다!");
      } else {
        const newFiles = Array.from(files).slice(0, 3 - imageData.length);

        // Downscale images
        const downscaledImages = await Promise.all(
          newFiles.map(async (file) => {
            const result = await downscaleImage({
              image: file,
              targetHeight: 720,
              returnFormat: "file",
            });
            if (result instanceof File) return result;
          })
        );
        // Remove null values
        const validImages = downscaledImages.filter(
          (img): img is File => img !== null
        );

        setImageData((prev) => [...prev, ...validImages]);
      }
    }
  };

  const removeImg = (index: number) => {
    setImageData((prev) => {
      const newImageData = [...prev];
      newImageData.splice(index, 1);
      return newImageData;
    });
  };

  const getPreviewURL = (file: File) => {
    return URL.createObjectURL(file);
  };

  return (
    <StPhotoUpload>
      <p className="title">사진 업로드</p>
      <div
        className="cardBox"
        onDrop={dragImage}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
      >
        <BasicSwiper spaceBetween={8} slidesPerView="auto" grabCursor={true}>
          <input type="file" id="photoInput" multiple onChange={uploadImage} />
          <SwiperSlide>
            <label htmlFor="photoInput">
              <div className="defaultCard">
                <img className="cameraIcon" src={camera} />
                <p className="score">
                  <span
                    style={
                      imageData.length > 0
                        ? { color: `var(--neutral_800)` }
                        : { color: `var(--neutral_300)` }
                    }
                  >
                    {imageData.length}
                  </span>
                  <span>/</span>
                  <span>3</span>
                </p>
              </div>
            </label>
          </SwiperSlide>
          {imageData.map((value, index) => {
            return (
              <SwiperSlide className="uploadedImgBox">
                <img
                  className="cancelIcon"
                  src={cancelIcon}
                  onClick={() => removeImg(index)}
                />
                <img
                  className="uploadedImg"
                  src={getPreviewURL(value)}
                  key={index}
                />
              </SwiperSlide>
            );
          })}
        </BasicSwiper>
      </div>
    </StPhotoUpload>
  );
};

const StCard = css`
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
`;

const StPhotoUpload = styled.div`
  display: grid;
  gap: 12px;
  padding: 0 20px;
  .swiper {
    margin: 0;
  }
  .swiper-slide {
    width: 100px !important;
  }
  .title {
    ${H4}
  }
  .cardBox {
    display: flex;
    gap: 8px;
    width: 100%;
    overflow-x: hidden;
    label {
      display: flex;
      width: 100px;
    }
    .defaultCard {
      ${StCard}
      .score {
        display: flex;
        gap: 1px;
        text-align: center;
        ${H5}
        color : var(--neutral_300);
        .count {
          color: var(--neutral_800);
        }
      }
    }
    .uploadedImgBox {
      position: relative;
      width: 100px;
      height: 100px;
      cursor: default;
      .uploadedImg {
        ${StCard}
        cursor: default;
      }
      .cancelIcon {
        position: absolute;
        right: 5px;
        top: 5px;
        cursor: pointer;
      }
    }
    input {
      display: none;
    }
  }
`;

export default PhotoUpload;
