import { B4, H2, H4 } from "@/style/font";
import styled from "styled-components";
import star from "@/image/icons/star.svg";

const PlaceInfo = () => {
  return (
    <StPlaceInfo>
      <p className="name">하우스서울 잠실새내</p>
      <p className="address">서울 송파구 백제고분로7길 28-7 1층</p>
      <div className="score">
        <img src={star} />
        <p>
          <span className="point">4.5</span>{" "}
          <span className="reviewCount">리뷰 35</span>
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
