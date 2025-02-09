import styled from "styled-components";
import foodPin from "@/image/icons/food.svg";
import cafePin from "@/image/icons/coffee.svg";
import bookmarkActive from "@/image/icons/bookmarkActive.svg";
import { placeCategory } from "@/interface/apiInterface";
import { B5, H4 } from "@/style/font";

interface Props {
  sort: placeCategory;
}

const RestaurantBoxForm: React.FC<Props> = ({ sort }) => {
  return (
    <StRestaurantBoxForm>
      <div className="restaurantImg">
        <img className="mark" src={bookmarkActive} />
        img
      </div>
      <div className="restaurantInfo">
        <div className="title">
          <img src={sort === "CAFE" ? cafePin : foodPin} />
          <p>음식점</p>
        </div>
        <p className="address">서울 00동</p>
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
