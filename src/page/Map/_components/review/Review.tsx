import styled from "styled-components";

import { H3 } from "@/style/font";
import ReviewDefault from "./ReviewDefault";
import ReviewSingle from "./ReviewSingle";
import Restaurant from "../Restaurant";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetSpecificPlaces from "@/hooks/api/useGetSpecificPlace";
import Button from "@/components/Button";
import ReviewGraph from "./ReviewGraph";

export interface ReviewProps {
  currentLatitude: number | undefined;
  currentLongitude: number | undefined;
}

const Review: React.FC<ReviewProps> = ({
  currentLatitude,
  currentLongitude,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const placeId = searchParams.get("placeId");
  if (!placeId) {
    throw new Error("placeId is required");
  }

  const { data } = useGetSpecificPlaces({
    kakaoPlaceId: placeId,
    currentLatitude,
    currentLongitude,
  });

  if (!data) return null;

  return (
    <StReview>
      {data && (
        <Restaurant
          key={placeId}
          name={data?.placeName}
          averageStarRating={data.averageStarRating}
          reviewImageUrls={data.reviewImageUrls}
          reviewerProfileImageUrls={data.reviewerProfileImageUrls}
          reviewCount={data.reviewCount}
          distance={data.distance}
        />
      )}
      <div className="reviewBucket">
        <div className="reviewTitle">
          <span>핀버디 리뷰</span>
          <Button size="small" onClick={() => navigate(`/review`)}>
            리뷰 작성
          </Button>
        </div>
        <ReviewGraph
          reviewCount={data.reviewCount}
          averageStarRating={data.averageStarRating}
          ratingGraph={data.ratingGraph}
        />
        <div className="reviewList">
          {data?.reviewCount > 0 ? (
            data.reviews.map((value, index) => {
              return (
                <div key={value.reviewId}>
                  <ReviewSingle
                    key={index}
                    writerName={value.writerName}
                    starRating={value.starRating}
                    writerProfileImageUrl={value.writerProfileImageUrl}
                    visitedDate={value.visitedDate}
                    content={value.content}
                    reviewId={value.reviewId}
                    writerTotalReviewCount={value.writerTotalReviewCount}
                    reviewImageUrls={value.reviewImageUrls}
                  />
                  {index + 1 !== data?.reviewCount && (
                    <div className="midLine" />
                  )}
                </div>
              );
            })
          ) : (
            <ReviewDefault />
          )}
        </div>
      </div>
    </StReview>
  );
};

const StReview = styled.div`
  width: 100%;
  min-width: 320px;
  max-width: 440px;
  padding: var(--spacing_8) 0;
  .reviewBucket {
    display: flex;
    flex-direction: column;
    padding: 16px 0;
    box-sizing: border-box;
  }
  .reviewTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    padding: 0 var(--spacing_20);
    box-sizing: border-box;
    margin-bottom: 16px;
    ${H3}
  }
  .reviewList {
    display: flex;
    flex-direction: column;
    padding: 20px 0;
  }
  .midLine {
    width: 100%;
    height: 1px;
    background-color: var(--neutral_50);
    margin: var(--spacing_16) 0;
  }
`;

export default Review;
