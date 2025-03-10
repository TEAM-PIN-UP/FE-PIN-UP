import styled from "styled-components";

import Button from "@/components/Button";
import useGetSpecificPlaces from "@/hooks/api/place/useGetSpecificPlace";
import { H3 } from "@/style/font";
import { useNavigate, useSearchParams } from "react-router-dom";
import Restaurant from "../Restaurant";
import ReviewDefault from "./ReviewDefault";
import ReviewGraph from "./ReviewGraph";
import ReviewSingle from "./ReviewSingle";

export interface ReviewProps {
  currentLatitude: number | undefined;
  currentLongitude: number | undefined;
  setBookmark: React.Dispatch<React.SetStateAction<boolean>>;
}

const Review: React.FC<ReviewProps> = ({
  currentLatitude,
  currentLongitude,
  setBookmark,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const kakaoPlaceId = searchParams.get("kakaoPlaceId");
  if (!kakaoPlaceId) {
    throw new Error("kakaoPlaceId is required");
  }

  const { data } = useGetSpecificPlaces({
    setBookmark,
    kakaoPlaceId,
    currentLatitude,
    currentLongitude,
  });

  if (!data) return null;

  return (
    <StReview>
      {data && (
        <Restaurant
          key={kakaoPlaceId}
          name={data?.mapPlaceResponse.name}
          averageStarRating={data.mapPlaceResponse.averageStarRating}
          reviewImageUrls={data.mapPlaceResponse.reviewImageUrls
            .slice()
            .reverse()}
          reviewerProfileImageUrls={data.mapPlaceResponse.reviewerProfileImageUrls
            .slice()
            .reverse()}
          reviewCount={data.mapPlaceResponse.reviewCount}
          distance={data.mapPlaceResponse.distance}
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
          reviewCount={data.mapPlaceResponse.reviewCount}
          averageStarRating={data.mapPlaceResponse.averageStarRating}
          ratingGraph={data.ratingGraph}
        />
        <div className="reviewList">
          {data?.mapPlaceResponse.reviewCount > 0 ? (
            data.reviews
              .slice()
              .reverse()
              .map((value, index) => {
                return (
                  <div key={`${value.reviewId}-reviewsingle`}>
                    <ReviewSingle
                      writerName={value.writerName}
                      starRating={value.starRating}
                      writerProfileImageUrl={value.writerProfileImageUrl}
                      visitedDate={value.visitedDate}
                      content={value.content}
                      reviewId={value.reviewId}
                      writerTotalReviewCount={value.writerTotalReviewCount}
                      reviewImageUrls={value.reviewImageUrls}
                    />
                    {index + 1 !== data?.mapPlaceResponse.reviewCount && (
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
  min-width: var(--min_width);
  max-width: var(--max_width);
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
