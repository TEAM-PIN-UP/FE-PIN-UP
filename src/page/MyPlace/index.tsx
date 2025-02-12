import styled from "styled-components";
import MyPlaceHeader from "./_components/Header";
import RestaurantBoxForm from "./_components/RestaurantBoxForm";
import FilterHead from "./_components/FilterHead";
import { useState } from "react";
import { placeCategory, placeSort } from "@/interface/apiInterface";
import useGetMyPlace from "@/hooks/api/myPlace/useGetMyPlace";

const MyPlacePage = () => {
  const [category, setCategory] = useState<placeCategory>("CAFE");
  const [sort, setSort] = useState<placeSort>("NEAR");
  const data = useGetMyPlace();
  console.log(data);
  console.log(sort);

  return (
    <StMyPlacePage>
      <MyPlaceHeader />
      <FilterHead
        setSort={setSort}
        category={category}
        setCategory={setCategory}
      />
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
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export default MyPlacePage;
