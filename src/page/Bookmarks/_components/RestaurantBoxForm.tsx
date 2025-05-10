import bookmarkActive from "@/image/icons/bookmarkActive.svg";
import cafePin from "@/image/icons/coffee.svg";
import foodPin from "@/image/icons/food.svg";
import { GetMyPlaceResponse, PlaceCategory } from "@/interface/place";
import { B5, H4 } from "@/style/font";
import styled from "styled-components";

interface Props {
  sort: PlaceCategory;
  data: GetMyPlaceResponse;
}

const RestaurantBoxForm: React.FC<Props> = ({ sort, data }) => {
  console.log(sort);
  return (
    <StRestaurantBoxForm>
      <div
        className="restaurantImg"
        style={{ backgroundImage: `url(${data.placeFirstReviewImageUrl})` }}
      >
        <img className="mark" src={bookmarkActive} />
      </div>
      <div className="restaurantInfo">
        <div className="title">
          <img
            src={data.placeCategory === "CAFE" ? cafePin : foodPin}
            className="type-icon"
          />
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
    background-size: cover;
    border-radius: 8px;
    .mark {
      position: absolute;
      top: 16px;
      right: 16px;
    }
  }

  .restaurantInfo {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: start;
    text-align: start;
    .title {
      .type-icon {
        width: 16px;
        height: 16px;
      }
      display: flex;
      width: 100%;
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
