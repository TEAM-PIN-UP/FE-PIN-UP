import { B5, H3 } from "@/style/font";
import React from "react";
import styled from "styled-components";

interface CardProps {
  image: string;
  title: string;
  date: string;
}

const Card: React.FC<CardProps> = ({ image, title, date }) => {
  return (
    <StDiv>
      <div className="thumb-area">
        <div className="thumb-overlay">
          <div className="overlay-1"></div>
          <div className="overlay-2">
            <span className="text">editor pick</span>
            <span className="text">pinup</span>
          </div>
        </div>
        <img className="thumb" src={image} />
      </div>
      <div className="title">{title}</div>
      <div className="date">{date}</div>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  text-align: start;
  padding-bottom: var(--spacing_24);

  .thumb-area {
    position: relative;
    aspect-ratio: calc(16 / 9);
    border-radius: var(--radius_12);
    width: 100%;

    .thumb-overlay {
      position: absolute;
      top: 0px;
      left: 0px;
      aspect-ratio: calc(16 / 9);
      border-radius: var(--radius_12);
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.1) 25%,
        rgba(0, 0, 0, 0.25) 50%,
        rgba(0, 0, 0, 0.45) 75%,
        rgba(0, 0, 0, 0.99) 100%
      );

      display: flex;
      flex-direction: column;
      justify-content: end;
      box-sizing: border-box;
      padding: var(--spacing_20);
      width: 100%;

      .overlay-1 {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: start;
      }

      .overlay-2 {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .text {
          ${H3}
          color: var(--white);
        }
      }
    }

    .thumb {
      aspect-ratio: calc(16 / 9);
      border-radius: var(--radius_12);
      object-fit: cover;
      width: 100%;
    }
  }

  .title {
    ${H3}
    color: var(--neutral_900);
    padding-top: var(--spacing_16);
  }

  .date {
    ${B5}
    color: var(--neutral_400);
    padding-top: var(--spacing_4);
  }
`;

export default Card;
