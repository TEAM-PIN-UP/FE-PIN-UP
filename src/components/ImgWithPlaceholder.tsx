import React, { ImgHTMLAttributes, useState } from "react";
import styled from "styled-components";

interface ImgWithPlaceholderProps extends ImgHTMLAttributes<HTMLImageElement> {
  onLoad?: () => void;
  onError?: () => void;
  maxWidth?: string;
}

const ImgWithPlaceholder: React.FC<ImgWithPlaceholderProps> = ({
  onLoad,
  onError,
  maxWidth = "100%",
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setIsLoading(false);
    if (onError) onError();
  };

  return (
    <StDiv $maxWidth={maxWidth}>
      <div className={`placeholder${isLoading ? " active" : ""}`} />
      <img
        {...props}
        onLoad={handleLoad}
        onError={handleError}
        className="image"
      />
    </StDiv>
  );
};

const StDiv = styled.div<{ $maxWidth: string }>`
  position: relative;
  display: block;
  max-width: ${(props) => props.$maxWidth};
  aspect-ratio: 1;

  .placeholder {
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #ccc;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    opacity: 0;
    transition: opacity 0.3s ease-in-out, z-index 0.6s ease-in-out;
    z-index: -10;

    &.active {
      opacity: 1;
      z-index: 10;
    }
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
`;

export default ImgWithPlaceholder;
