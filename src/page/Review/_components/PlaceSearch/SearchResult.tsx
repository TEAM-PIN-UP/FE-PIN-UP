import { H4 } from "@/style/font";
import styled from "styled-components";
import SearchedPlace from "./SearchedPlace";

const SearchResult = () => {
  return (
    <StSearchResult>
      <div className="title">검색 결과</div>
      <div className="results">
        <SearchedPlace />
        <SearchedPlace />
        <SearchedPlace />
      </div>
    </StSearchResult>
  );
};

const StSearchResult = styled.div`
  display: grid;
  gap: var(--spacing_16);
  padding: var(--spacing_12) 0;
  box-sizing: border-box;
  margin-top: var(--spacing_16);
  .title {
    ${H4}
  }
  .results {
    display: grid;
  }
`;

export default SearchResult;
