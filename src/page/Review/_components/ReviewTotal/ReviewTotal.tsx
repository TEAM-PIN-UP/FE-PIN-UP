import Button from "@/components/Button";
import useCreateReview from "@/hooks/api/review/usePostCreateReview";
import {
  GetSearchPlacesResponse,
  PlaceRequestType,
  ReviewRequestType,
} from "@/interface/apiInterface";
import useModalPopup from "@/utils/modalPopup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckScore from "./CheckScore";
import PhotoUpload from "./PhotoUpload";
import PlaceInfo from "./PlaceInfo";
import WriteReview from "./WriteReview";

interface ReviewTotalProps {
  pickedInfo: GetSearchPlacesResponse;
  visitDate: Date;
}

const ReviewTotal: React.FC<ReviewTotalProps> = ({ pickedInfo, visitDate }) => {
  const navigate = useNavigate();
  const [starScore, setStarScore] = useState<number>(0);
  const [imageData, setImageData] = useState<File[]>([]);
  const [reviewContent, setReviewContent] = useState<string>("");
  const reviewCreate = useCreateReview();
  const { openModal, closeModal } = useModalPopup();

  const formatDate = (date: Date) => {
    const year = date.getFullYear() % 100;
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const handleReviewSubmit = () => {
    const formData = new FormData();

    const reviewRequest: ReviewRequestType = {
      content: reviewContent,
      starRating: starScore,
      visitedDate: formatDate(visitDate),
    };

    const placeRequest: PlaceRequestType = {
      kakaoPlaceId: pickedInfo.kakaoPlaceId,
      name: pickedInfo.name,
      category: pickedInfo.placeCategory,
      address: pickedInfo.address,
      roadAddress: pickedInfo.roadAddress,
      latitude: Number(pickedInfo.latitude),
      longitude: Number(pickedInfo.longitude),
    };

    // 리뷰 데이터
    formData.append(
      "reviewRequest",
      new Blob([JSON.stringify(reviewRequest)], { type: "application/json" })
    );

    // 장소 데이터
    formData.append(
      "placeRequest",
      new Blob([JSON.stringify(placeRequest)], { type: "application/json" })
    );

    imageData.forEach((file) => {
      formData.append(`multipartFiles`, file);
    });

    reviewCreate.mutate(formData);

    openModal({
      type: "cancel-ok",
      title: "리뷰 작성 완료!",
      body: ["등록한 리뷰를", "확인하시겠어요?"],
      okButtonText: "확인",
      onOkButtonClick: () => {
        closeModal();
        navigate(`/map?kakaoPlaceId=${pickedInfo.kakaoPlaceId}`);
      },
      cancelButtonText: "취소",
      onCancelButtonClick: () => {
        closeModal();
        navigate("/map");
      },
    });
  };

  return (
    <>
      <StWriteReview>
        <PlaceInfo pickedInfo={pickedInfo} />
        <div className="divide-line" />
        <PhotoUpload imageData={imageData} setImageData={setImageData} />
        <div className="divide-line" />
        <CheckScore starScore={starScore} setStarScore={setStarScore} />
        <div className="divide-line" />
        <WriteReview
          reviewContent={reviewContent}
          setReviewContent={setReviewContent}
        />
        <div className="buttonBucket">
          <Button
            size="full"
            active={starScore > 0 && reviewContent.length >= 10}
            onClick={handleReviewSubmit}
          >
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
  .divide-line {
    width: calc(100% - 40px);
    height: 1px;
    background-color: var(--neutral_100);
    margin: 20px auto;
  }
`;

export default ReviewTotal;
