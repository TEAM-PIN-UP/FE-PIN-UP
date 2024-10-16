import styled from "styled-components";
import profileImg from "@/image/icons/profile.jpg";
import star from "@/image/icons/star.svg";
import option from "@/image/icons/option.svg";
import { B3, B6, D2, H4 } from "@/style/font";
import { reviewProps } from "./Review";

const ReviewSingle: React.FC<reviewProps> = (data) => {
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
          <img className="option" src={option} alt="option" />
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
        width: 16px;
        height: 16px;
        margin-left: auto;
      }
    }
    .reviewContent {
      display: flex;
      ${D2}
      text-align: left;
    }
  }
`;

export default ReviewSingle;
