import styled from "styled-components";
import PlaceInfo from "./PlaceInfo";
import PhotoUpload from "./PhotoUpload";
import CheckScore from "./CheckScore";
import WriteReview from "./WriteReview";
import { useState } from "react";
import Button from "@/components/Button";
import { getSearchPlacesResponse } from "@/interface/apiInterface";
import useCreateReview from "@/hooks/api/review/usePostCreateReview";

interface ReviewTotalProps {
  pickedInfo: getSearchPlacesResponse;
  visitDate: Date;
}

const ReviewTotal = ({ pickedInfo, visitDate }: ReviewTotalProps) => {
  const [starScore, setStarScore] = useState<number>(0);
  const [imageData, setImageData] = useState<string[]>([]);
  const [reviewContent, setReviewContent] = useState<string>("");
  const reviewCreate = useCreateReview();

  const handleReviewSubmit = () => {
    reviewCreate.mutate({
      reviewRequest: {
        content: reviewContent,
        starRating: starScore,
        visitedDate: visitDate.toLocaleDateString().split('. ').join('').slice(0, 8),
      },
      placeRequest: {
        kakaoPlaceId: pickedInfo.kakaoMapId,
        name: pickedInfo.name,
        category: pickedInfo.category ? pickedInfo.category : '음식점',
        address: pickedInfo.address,
        roadAddress: pickedInfo.roadAddress,
        latitude: pickedInfo.latitude,
        longitude: pickedInfo.longitude
      },
      multipartFiles: imageData
    })
  }


  return (
    <StWriteReview>
      <PlaceInfo pickedInfo={pickedInfo} />
      <div className="devideLine" />
      <PhotoUpload imageData={imageData} setImageData={setImageData} />
      <div className="devideLine" />
      <CheckScore starScore={starScore} setStarScore={setStarScore} />
      <div className="devideLine" />
      <WriteReview
        reviewContent={reviewContent}
        setReviewContent={setReviewContent}
      />
      <div className="buttonBucket">
        <Button size="full" onClick={handleReviewSubmit}>
          리뷰 등록하기
        </Button>
      </div>
    </StWriteReview>
  );
};

const StWriteReview = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 16px;
  .buttonBucket {
    padding: 8px 20px 14px;
    margin-top: auto;
    border-top: 1px solid var(--neutral_100);
    /* padding: 0 20px; */
  }
  .devideLine {
    width: calc(100% - 40px);
    height: 1px;
    background-color: var(--neutral_100);
    margin: 20px auto;
  }
`;

export default ReviewTotal;
