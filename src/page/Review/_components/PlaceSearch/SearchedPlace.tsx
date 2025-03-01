import defaultProfile from "@/image/icons/defaultProfile.svg";
import { GetSearchPlacesResponse } from "@/interface/apiInterface";
import { B3, B5, C3 } from "@/style/font";
import styled from "styled-components";

export interface SearchResultProp {
  stepUp: () => void;
  result: GetSearchPlacesResponse;
  setPickedInfo: React.Dispatch<
    React.SetStateAction<GetSearchPlacesResponse | null>
  >;
}

const SearchedPlace: React.FC<SearchResultProp> = ({
  stepUp,
  result,
  setPickedInfo,
}) => {
  return (
    <StSearchedPlace
      onClick={() => {
        stepUp();
        setPickedInfo(result);
      }}
    >
      <img src={defaultProfile} />
      <div className="totalInfo">
        <div className="placeInfo">
          <p className="placeName">{result?.name}</p>
          <p className="location">{result?.roadAddress}</p>
        </div>
        <div className="reviewCount">리뷰 {result?.reviewCount}</div>
      </div>
    </StSearchedPlace>
  );
};

const StSearchedPlace = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  img {
    width: 36px;
    height: 36px;
    border-radius: var(--radius_circle);
    border: 1px solid var(--neutral_200);
    margin-right: var(--spacing_12);
  }
  .totalInfo {
    display: flex;
    flex: 1;
    justify-content: space-between;
    .placeInfo {
      display: grid;
      gap: 4px;
      .placeName {
        ${B3}
        color :var(--neutral_800)
      }
      .location {
        ${C3}
        color : var(--neutral_500)
      }
    }
    .reviewCount {
      ${B5}
      color: var(--neutral_600);
    }
  }
`;

export default SearchedPlace;
