import React from "react";
import styled from "styled-components";

import profileImg from "@/image/icons/profile.jpg";
import { B4, H3, H4 } from "@/style/font";
import ImageSwiper from "./ImageSwiper";

export interface RestaurantProps {
  name: string;
  averageRating: number;
  defaultImgUrl: string;
}

const Restaurant: React.FC<RestaurantProps> = ({
  name,
  averageRating,
  defaultImgUrl,
}) => {
  return (
    <StRestaurant>
      <div className="container">
        <div className="infoContainer">
          <div className="textContainer">
            <div className="title">{name}</div>
            <div className="rating">⭐ {averageRating.toFixed(1)}</div>
            <div className="detail">
              <span className="distance">2.4km</span>
              <span className="reviewNum">리뷰 4</span>
            </div>
          </div>
          <div className="profile" />
        </div>
        <ImageSwiper defaultImgUrl={defaultImgUrl} />
      </div>
      <div className="gap" />
    </StRestaurant>
  );
};

const StRestaurant = styled.div`
  width: 100%;
  .container {
    padding: var(--spacing_20);
    margin: 0 auto;
    .infoContainer {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      align-self: stretch;
      padding-bottom: var(--spacing_16);
      .textContainer {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing_6);
        .title {
          ${H3};
          color: var(--neutral_800);
        }
        .rating {
          ${H4};
          color: var(--neutral_800);
          text-align: center;
        }
        .detail {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          .distance {
            ${B4};
            color: var(--neutral_500);
          }
          .reviewNum {
            ${B4};
            color: var(--neutral_700);
          }
        }
      }
      .profile {
        width: 26px;
        height: 26px;
        border-radius: var(--radius_circle);
        border: 1px solid var(--white);
        background: url(${profileImg}) lightgray 50% / cover no-repeat;
      }
    }
  }
  .gap {
    height: 8px;
    align-self: stretch;
    background: var(--neutral_50);
  }
`;

export default Restaurant;
