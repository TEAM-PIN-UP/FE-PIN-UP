import { B3, B5, C3 } from "@/style/font";
import styled from "styled-components";
import sample from "@/image/icons/profile.jpg";
import { StepUp } from "./SearchResult";

const SearchedPlace: React.FC<StepUp> = ({ stepUp }) => {
  return (
    <StSearchedPlace onClick={stepUp}>
      <img src={sample} />
      <div className="totalInfo">
        <div className="placeInfo">
          <p className="placeName">잠실새내 딤딤섬</p>
          <p className="location">서울 송파구 백제고분로7길 28-7 1층</p>
        </div>
        <div className="reviewCount">리뷰 35</div>
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
