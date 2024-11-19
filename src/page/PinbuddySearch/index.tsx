import styled from "styled-components";
import ReviewSearchBar from "../Review/_components/PlaceSearch/ReviewSearchBar";
import SearchResultList from "./_components/SearchResultList";
import { useState } from "react";

const PinbuddySearch: React.FC = () => {
  const [searchList, setSearchList] = useState<boolean>(false);

  const ResultHide = () => {
    setSearchList(false);
  };

  const ResultShow = () => {
    setSearchList(true);
  };

  return (
    <StPinBuddySearch>
      <div className="emptyBox" />
      <ReviewSearchBar
        infoHideFunc={ResultShow}
        infoShowFunc={ResultHide}
        placeholder="친구 닉네임을 검색해보세요."
      />
      {searchList ? <SearchResultList /> : <></>}
    </StPinBuddySearch>
  );
};

const StPinBuddySearch = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  .emptyBox {
    width: 100%;
    height: 48px;
  }
`;

export default PinbuddySearch;
