import SearchInfo from "./SearchInfo";
import { useState } from "react";
import ReviewSearchBar from "./ReviewSearchBar";
import styled from "styled-components";
import SearchResult from "./SearchResult";

const PlaceSearch = () => {
  const [infoShow, setInfoShow] = useState<boolean>(true);

  const infoHideFunc = () => {
    setInfoShow(false);
  };

  const infoShowFunc = () => {
    setInfoShow(true);
  };

  return (
    <StPlaceSearch>
      {infoShow ? <SearchInfo /> : <></>}
      <ReviewSearchBar
        placeholder="리뷰 쓸 장소를 검색해주세요."
        infoHideFunc={infoHideFunc}
        infoShowFunc={infoShowFunc}
      />
      <SearchResult />
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
