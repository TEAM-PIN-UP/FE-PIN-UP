import search from "@/image/icons/search.svg";
import { GetPinBuddySearchResponse } from "@/interface/member";
import { B3, H3, H4 } from "@/style/font";
import styled from "styled-components";
import SearchResultSingle from "./SearchResultSingle";

interface PinBuddySearchProps {
  data: GetPinBuddySearchResponse[];
}

const SearchResultList: React.FC<PinBuddySearchProps> = ({ data }) => {
  return (
    <StSearchResultList>
      <p className="listTitle">검색 결과</p>
      {data.length > 0 ? (
        data.map((val) => (
          <SearchResultSingle key={val.memberResponse.memberId} data={val} />
        ))
      ) : (
        <div className="resultNone">
          <img src={search} alt="" />
          <p className="info1">검색 결과가 없어요</p>
          <p className="info2">검색어를 확인해주세요.</p>
        </div>
      )}
      {/* {data.length === 0 ? (
        <div className="resultNone">
          <img src={search} alt="" />
          <p className="info1">검색 결과가 없어요</p>
          <p className="info2">검색어를 확인해주세요.</p>
        </div>
      ) : (
        <div>
          <SearchResultSingle />
        </div>
      )} */}
    </StSearchResultList>
  );
};

const StSearchResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 0;
  margin-top: 12px;
  .listTitle {
    ${H4}
    text-align: left;
  }
  .resultNone {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 341px;
    img {
      width: 40px;
      height: 40px;
    }
    .info1 {
      ${H3}
      margin: 12px 0 6px;
    }
    .info2 {
      ${B3}
      color : var(--neutral_500);
    }
  }
`;

export default SearchResultList;
