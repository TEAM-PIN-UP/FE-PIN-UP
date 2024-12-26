import SearchInfo from "./SearchInfo";
import { useEffect, useState } from "react";
import ReviewSearchBar from "./ReviewSearchBar";
import styled from "styled-components";
import SearchResult from "./SearchResult";
import useGetSearchPlaces from "@/hooks/api/review/useGetSearchPlaces";
import { getSearchPlacesResponse } from "@/interface/apiInterface";

export interface PlaceSearchProp {
  stepUp: () => void;
  setPickedInfo: React.Dispatch<React.SetStateAction<getSearchPlacesResponse | null>>
}

const PlaceSearch: React.FC<PlaceSearchProp> = ({ stepUp, setPickedInfo }) => {
  const [infoShow, setInfoShow] = useState<boolean>(true);
  const [reviewSearch, setReviewSearch] = useState<string>('');

  const infoHideFunc = () => {
    setInfoShow(false);
  };

  const infoShowFunc = () => {
    setInfoShow(true);
  };

  const { data } = useGetSearchPlaces({ keyword: reviewSearch });

  return (
    <StPlaceSearch>
      {infoShow ? <SearchInfo /> : <></>}
      <ReviewSearchBar
        placeholder="리뷰 쓸 장소를 검색해주세요."
        infoHideFunc={infoHideFunc}
        infoShowFunc={infoShowFunc}
        reviewSearch={reviewSearch}
        setReviewSearch={setReviewSearch}
      />
      <SearchResult stepUp={stepUp} results={data} setPickedInfo={setPickedInfo} />
    </StPlaceSearch>
  );
};

const StPlaceSearch = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacing_20);
  box-sizing: border-box;
`;

export default PlaceSearch;
