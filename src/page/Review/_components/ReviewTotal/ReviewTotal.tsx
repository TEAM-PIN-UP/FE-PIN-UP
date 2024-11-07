import styled from "styled-components";
import PlaceInfo from "./PlaceInfo";
import PhotoUpload from "./PhotoUpload";
import CheckScore from "./CheckScore";
import WriteReview from "./WriteReview";
import { useState } from "react";

const ReviewTotal = () => {
  const [starScore, setStarScore] = useState<number>(0);
  const [imageData, setImageData] = useState<string[]>([]);

  return (
    <StWriteReview>
      <PlaceInfo />
      <div className="devideLine" />
      <PhotoUpload imageData={imageData} setImageData={setImageData} />
      <div className="devideLine" />
      <CheckScore starScore={starScore} setStarScore={setStarScore} />
      <div className="devideLine" />
      <WriteReview />
    </StWriteReview>
  );
};

const StWriteReview = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  padding: 0 20px;
  .devideLine {
    width: 100%;
    height: 1px;
    background-color: var(--neutral_100);
    margin: 20px 0;
  }
`;

export default ReviewTotal;
