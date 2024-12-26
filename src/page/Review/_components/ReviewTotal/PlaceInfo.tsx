import { B4, H2, H4 } from "@/style/font";
import styled from "styled-components";
import star from "@/image/icons/star.svg";
import { getSearchPlacesResponse } from "@/interface/apiInterface";

const PlaceInfo = ({ pickedInfo }: { pickedInfo: getSearchPlacesResponse | null }) => {
  return (
    <StPlaceInfo>
      <p className="name">{pickedInfo?.name}</p>
      <p className="address">{pickedInfo?.roadAddress}</p>
      <div className="score">
        <img src={star} />
        <p>
          <span className="point">4.5</span>{" "}
          <span className="reviewCount">리뷰 {pickedInfo?.reviewCount}</span>
        </p>
      </div>
    </StPlaceInfo>
  );
};

const StPlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 20px;
  .name {
    ${H2}
  }
  .address {
    ${B4}
    color: var(--neutral_400);
  }
  .score {
    display: flex;
    img {
      width: 18px;
      height: 18px;
      margin-right: 2px;
    }
    .point {
      ${H4}
    }
    .reviewCount {
      ${B4}
      color: var(--neutral_700);
      margin-left: 6px;
    }
  }
`;

export default PlaceInfo;
