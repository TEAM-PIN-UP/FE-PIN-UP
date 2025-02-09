import React from "react";
import styled from "styled-components";

import profileImg from "@/image/icons/profile.jpg";
import { B4, H3, H4 } from "@/style/font";
import ImageSwiper from "./ImageSwiper";

export interface RestaurantProps {
  placeId: number;
  name: string;
  averageStarRating: number;
  reviewCount: number;
  distance: string;
  reviewImageUrls: string[];
  reviewerProfileImageUrls: string[];
}

const Restaurant: React.FC<RestaurantProps> = ({
  name,
  averageStarRating,
  reviewCount,
  distance,
  reviewImageUrls,
  reviewerProfileImageUrls,
}) => {

  return (
    <StRestaurant>
      <div className="container">
        <div className="infoContainer">
          <div className="textContainer">
            <div className="title">{name}</div>
            <div className="rating">⭐ {averageStarRating.toFixed(1)}</div>
            <div className="detail">
              <span className="distance">{distance}</span>
              <span className="reviewNum">리뷰 {reviewCount}</span>
            </div>
          </div>
          <div className="profileBox">
            {
              reviewerProfileImageUrls ? reviewerProfileImageUrls.map((val, index) => (
                <img className="profileImg" src={val} key={index} />
              )) : <img src={profileImg} />
            }
          </div>
          <div className="profile" />
        </div>
        <ImageSwiper imageUrls={reviewImageUrls} />
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
    cursor: pointer;
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
      .profileBox{
        display: flex;
        margin-left: auto;
        .profileImg{
          width: 26px;
          height: 26px;
          border-radius: var(--radius_circle);
          border: 1px solid var(--white);
        }
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