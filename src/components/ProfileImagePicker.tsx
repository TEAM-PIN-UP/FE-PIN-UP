import React, { forwardRef, RefObject } from "react";
import styled from "styled-components";

interface ProfileImagePickerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  imageUrl: string | null;
  onImageChange: (image: File) => void;
  onImageRemove?: () => void;
  placeholderIcon?: string;
  ref?: RefObject<HTMLInputElement>;
  size: string;
}

const ProfileImagePicker = forwardRef<
  HTMLInputElement,
  ProfileImagePickerProps
>(
  (
    { imageUrl, onImageChange, onImageRemove, placeholderIcon, size, ...props },
    ref
  ) => {
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
      if (file) onImageChange(file);
    };

    return (
      <StDiv $size={size}>
        {imageUrl && (
          <button className="remove-image" onClick={onImageRemove}>
            ×
          </button>
        )}
        <StImagePicker
          $size={size}
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
          }}
          {...props}
        >
          {!imageUrl && placeholderIcon && (
            <img className="placeholder-icon" src={placeholderIcon} />
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            ref={ref}
            className="image-input"
            onChange={handleImageChange}
          />
        </StImagePicker>
      </StDiv>
    );
  }
);

const StDiv = styled.div<{ $size: string }>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  position: relative;

  .remove-image {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 24px;
    height: 24px;
    background-color: lightgray;
    border: none;
    border-radius: var(--radius_circle);
    color: var(--neutral_600);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bolder;
    font-size: 16px;
    padding: 0px;
    z-index: 10;
  }
`;

const StImagePicker = styled.button<{ $size: string }>`
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  background-color: var(--neutral_100);
  background-size: cover;
  background-position: center;
  border: none;
  border-radius: var(--radius_circle);
  cursor: pointer;

  .placeholder-icon {
    width: 24px;
    height: 24px;
  }

  .image-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--radius_circle);
    opacity: 0;
    cursor: pointer;
  }
`;

export default ProfileImagePicker;
