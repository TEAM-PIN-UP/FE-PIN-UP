import styled from "styled-components";
import foodPin from "@/image/icons/food.svg";
import cafePin from "@/image/icons/coffee.svg";
import bookmarkActive from "@/image/icons/bookmarkActive.svg";
import { GetMyPlaceResponse, placeCategory } from "@/interface/apiInterface";
import { B5, H4 } from "@/style/font";

interface Props {
  sort: placeCategory;
  data: GetMyPlaceResponse;
}

const RestaurantBoxForm: React.FC<Props> = ({ sort, data }) => {
  console.log(sort);
  return (
    <StRestaurantBoxForm>
      <div
        className="restaurantImg"
        style={{ backgroundImage: `url(${data.placeDefaultImgUrl})` }}
      >
        <img className="mark" src={bookmarkActive} />
      </div>
      <div className="restaurantInfo">
        <div className="title">
          <img src={data.placeCategory === "CAFE" ? cafePin : foodPin} />
          <p>{data.placeName}</p>
        </div>
        <p className="address">{data.placeAddress}</p>
      </div>
    </StRestaurantBoxForm>
  );
};

const StRestaurantBoxForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  .restaurantImg {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    background-color: var(--neutral_100);
    border-radius: 8px;
    .mark {
      position: absolute;
      top: 15.6px;
      right: 16.6px;
    }
  }
  .restaurantInfo {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: start;
    .title {
      display: flex;
      gap: 4px;
      ${H4}
    }
    .address {
      ${B5}
      color : var(--neutral_400)
    }
  }
`;

export default RestaurantBoxForm;
