import { useState } from "react";
import styled from "styled-components";

import option from "@/image/icons/option.svg";
import profileImg from "@/image/icons/profile.jpg";
import star from "@/image/icons/star.svg";
import { B3, B6, D2, H4 } from "@/style/font";
import { reviewProps } from "./Review";
import ReviewModal from "./ReviewModal";

const ReviewSingle: React.FC<reviewProps> = (data) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <StReviewSingle>
      <img className="profileImg" src={profileImg} alt="profileImg" />
      <div className="bucket">
        <div className="commentInfoWithIcon">
          <div className="commentInfo">
            <p className="name">{data.name}</p>
            <img className="star" src={star} alt="star" />
            <p className="score">{data.score}</p>
            <p className="date">{data.date}</p>
          </div>
          <div className="option">
            {openModal ? <ReviewModal setOpenModal={setOpenModal} /> : <></>}
            <img
              className="pointer"
              src={option}
              onClick={() => setOpenModal(true)}
              alt="option"
            />
          </div>
        </div>
        <div className="reviewContent">{data.comment}</div>
      </div>
    </StReviewSingle>
  );
};

const StReviewSingle = styled.div`
  display: flex;
  width: 100%;
  padding: 0 var(--spacing_20);
  box-sizing: border-box;
  gap: 12px;
  .profileImg {
    width: 40px;
    height: 40px;
    border-radius: var(--radius_circle);
  }
  .bucket {
    display: flex;
    flex-direction: column;
    gap: 5.5px;
    width: 100%;
    .commentInfoWithIcon {
      display: flex;
      .commentInfo {
        display: flex;
        align-items: center;
        p {
          margin: 0px;
        }
        .name {
          ${H4}
          color: var(--neutral_800);
        }
        .star {
          width: 16px;
          height: 16px;
          margin: 0 2px 0 4px;
        }
        .score {
          ${B3}
        }
        .date {
          ${B6}
          color: var(--neutral_400);
          margin-left: 8px;
        }
      }
      .option {
        position: relative;
        width: 16px;
        height: 16px;
        margin-left: auto;
        .pointer {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
    }
    .reviewContent {
      display: flex;
      ${D2}
      text-align: left;
      color: var(--neutral_700);
    }
  }
`;

export default ReviewSingle;
