import useFriendSearch from "@/hooks/api/pinBuddy/useFriendSearch";
import { useState } from "react";
import styled from "styled-components";
import ReviewSearchBar from "../Review/_components/PlaceSearch/ReviewSearchBar";
import SearchResultList from "./_components/SearchResultList";

const PinbuddySearch: React.FC = () => {
  const [searchList, setSearchList] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");

  const ResultHide = () => {
    setSearchList(false);
  };

  const ResultShow = () => {
    setSearchList(true);
  };

  const { data } = useFriendSearch({ nickname, setSearchList });
  return (
    <StPinBuddySearch>
      <div className="emptyBox" />
      <ReviewSearchBar
        infoHideFunc={ResultHide}
        infoShowFunc={ResultShow}
        placeholder="친구 닉네임을 검색해보세요."
        reviewSearch={nickname}
        setReviewSearch={setNickname}
      />
      {searchList && data && <SearchResultList data={data} />}
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
