import useGetBookmarks from "@/hooks/api/myPlace/useGetMyPlace";
import useCheckLoginAndRoute from "@/hooks/useCheckLoginAndRoute";
import { PlaceCategory, PlaceSort } from "@/interfaces/place";
import { getLastKnownPositionObj } from "@/utils/getFromLocalStorage";
import { useState } from "react";
import styled from "styled-components";
import FilterHead from "./_components/FilterHead";
import MyPlaceHeader from "./_components/Header";
import RestaurantBoxForm from "./_components/RestaurantBoxForm";

const BookmarkPage: React.FC = () => {
  useCheckLoginAndRoute();

  const [category, setCategory] = useState<PlaceCategory>("ALL");
  const [sort, setSort] = useState<PlaceSort>("NEAR");
  const pos = getLastKnownPositionObj();
  const { data } = useGetBookmarks({
    sort,
    category,
    currentLatitude: pos.coords.latitude,
    currentLongitude: pos.coords.longitude,
  });
  return (
    <StMyPlacePage>
      <MyPlaceHeader />
      <FilterHead
        setSort={setSort}
        category={category}
        setCategory={setCategory}
      />
      <StCardGrid>
        {data &&
          data?.map((val) => {
            return (
              <RestaurantBoxForm data={val} sort="ALL" key={val.kakaoPlaceId} />
            );
          })}
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

export default BookmarkPage;
