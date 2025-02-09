import styled from "styled-components";
import MyPlaceHeader from "./_components/Header";
import RestaurantBoxForm from "./_components/RestaurantBoxForm";

const MyPlacePage = () => {
  return (
    <StMyPlacePage>
      <MyPlaceHeader />

      <StCardGrid>
        <RestaurantBoxForm sort={"CAFE"} />
        <RestaurantBoxForm sort={"CAFE"} />
        <RestaurantBoxForm sort={"CAFE"} />
        <RestaurantBoxForm sort={"CAFE"} />
      </StCardGrid>
    </StMyPlacePage>
  );
};

const StMyPlacePage = styled.div`
  width: 100%;
`;

const StCardGrid = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export default MyPlacePage;
