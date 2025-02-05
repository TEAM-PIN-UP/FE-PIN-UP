import styled from "styled-components";
import PlaceInfo from "./PlaceInfo";
import PhotoUpload from "./PhotoUpload";
import CheckScore from "./CheckScore";
import WriteReview from "./WriteReview";
import { useState } from "react";
import Button from "@/components/Button";
import { getSearchPlacesResponse, PlaceRequestType, ReviewRequestType } from "@/interface/apiInterface";
import useCreateReview from "@/hooks/api/review/usePostCreateReview";

interface ReviewTotalProps {
  pickedInfo: getSearchPlacesResponse;
  visitDate: Date;
}

const ReviewTotal = ({ pickedInfo, visitDate }: ReviewTotalProps) => {
  const [starScore, setStarScore] = useState<number>(0);
  const [imageData, setImageData] = useState<File[]>([]);
  const [reviewContent, setReviewContent] = useState<string>("");
  const reviewCreate = useCreateReview();

  const handleReviewSubmit = () => {
    const formData = new FormData();

    const reviewRequest: ReviewRequestType = {
      content: reviewContent,
      starRating: starScore,
      visitedDate: visitDate.toLocaleDateString().split('. ').join('').slice(0, 8),
    };

    const placeRequest: PlaceRequestType = {
      kakaoPlaceId: pickedInfo.kakaoMapId,
      name: pickedInfo.name,
      category: pickedInfo.category === '음식점' ? 'RESTAURANT' : 'CAFE',
      address: pickedInfo.address,
      roadAddress: pickedInfo.roadAddress,
      latitude: Number(pickedInfo.latitude),
      longitude: Number(pickedInfo.longitude),
    };

    // 리뷰 데이터
    formData.append(
      "reviewRequest",
      new Blob(
        [
          JSON.stringify(reviewRequest),
        ],
        { type: "application/json" }
      )
    );

    // 장소 데이터
    formData.append(
      "placeRequest",
      new Blob(
        [
          JSON.stringify(placeRequest),
        ],
        { type: "application/json" }
      )
    );

    imageData.forEach((file) => {
      formData.append(`multipartFiles`, file);
    })

    reviewCreate.mutate(formData);

  }


  return (
    <>
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
    </>
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
