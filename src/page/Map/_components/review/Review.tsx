import styled from "styled-components";

import { H3 } from "@/style/font";
import ReviewDefault from "./ReviewDefault";
import ReviewSingle from "./ReviewSingle";
import Restaurant from "../Restaurant";
import { useSearchParams } from "react-router-dom";
import useGetSpecificPlaces from "@/hooks/api/useGetSpecificPlace";

export interface reviewProps {
  profileImg: string;
  name: string;
  score: number;
  date: string;
  comment: string;
}

const Review: React.FC = () => {


  const [searchParams] = useSearchParams();
  const placeId = searchParams.get('placeId');
  if (!placeId) {
    throw new Error('placeId is required');
  }

  const { data } = useGetSpecificPlaces({
    kakaoPlaceId: placeId
  });

  if (!data) return null


  return (
    <StReview>
      {data && <Restaurant
        key={placeId}
        name={data?.placeName}
        averageStarRating={data.averageStarRating}
        reviewImageUrls={['']}
        reviewerProfileImageUrls={
          ['']
        }
        reviewCount={data.reviewCount}
        distance={'2.4'}
      />}
      <div className="reviewBucket">
        <div className="reviewTitle">
          <span>리뷰</span>
          <span>{data?.reviewCount}</span>
        </div>
        {data?.reviewCount > 0 ? (
          data.reviews.map((value, index) => {
            return (
              <>
                <ReviewSingle
                  key={index}
                  name={value.writerName}
                  score={value.starRating}
                  profileImg={value.writerProfileImageUrl}
                  date={value.visitedDate}
                  comment={value.content}
                />
                {index + 1 !== data?.reviewCount && <div className="midLine" />}
              </>
            );
          })
        ) : (
          <ReviewDefault />
        )}
      </div>
    </StReview>
  );
};

const StReview = styled.div`
  width: 100%;
  min-width: 320px;
  max-width: 440px;
  padding: var(--spacing_8) 0;
  .reviewBucket{
    display: flex;
    flex-direction: column;
    padding : 16px 0;
    box-sizing: border-box;
  }
  .reviewTitle {
    display: flex;
    gap: 4px;
    padding: 0 var(--spacing_20);
    box-sizing: border-box;
    margin-bottom: 24px;
    ${H3}
  }
  .midLine {
    width: 100%;
    height: 1px;
    background-color: var(--neutral_50);
    margin: var(--spacing_16) 0;
  }
`;

export default Review;
