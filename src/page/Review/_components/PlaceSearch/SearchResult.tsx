import { GetSearchPlacesResponse } from "@/interface/apiInterface";
import { H4 } from "@/style/font";
import styled from "styled-components";
import SearchedPlace from "./SearchedPlace";

export interface SearchResultProp {
  stepUp: () => void;
  results?: GetSearchPlacesResponse[];
  setPickedInfo: React.Dispatch<
    React.SetStateAction<GetSearchPlacesResponse | null>
  >;
}

const SearchResult: React.FC<SearchResultProp> = ({
  stepUp,
  results,
  setPickedInfo,
}) => {
  return (
    <StSearchResult>
      <div className="title">검색 결과</div>
      <div className="results">
        {results?.map((result) => (
          <SearchedPlace
            key={result.kakaoMapId}
            stepUp={stepUp}
            result={result}
            setPickedInfo={setPickedInfo}
          />
        ))}
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
    gap: var(--spacing_24);
  }
`;

export default SearchResult;
