import styled from "styled-components";
import PlaceSearch from "./_components/PlaceSearch/PlaceSearch";
import ReviewHeader from "./_components/ReviewHeader";

const ReviewPage = () => {
  return (
    <StReview>
      <ReviewHeader />
      <PlaceSearch />
    </StReview>
  );
};

const StReview = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
`;

export default ReviewPage;
