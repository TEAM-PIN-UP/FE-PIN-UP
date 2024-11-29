import React from "react";
import styled from "styled-components";

interface ProfileImagePickerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  imageUrl: string | null;
  onImageChange: (image: File) => void;
  placeholderIcon?: string;
  ref?: React.MutableRefObject<HTMLInputElement>;
  size: string;
}

const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({
  imageUrl,
  onImageChange,
  placeholderIcon,
  ref,
  size,
  ...props
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) onImageChange(file);
  };

  return (
    <StImagePicker
      $size={size}
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
      }}
      {...props}
    >
      {!imageUrl && placeholderIcon && (
        <img className="placeholder-icon" src={placeholderIcon} alt="Icon" />
      )}
      <input
        type="file"
        accept="image/jpeg, image/png"
        ref={ref}
        className="image-input"
        onChange={handleImageChange}
      />
    </StImagePicker>
  );
};

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
