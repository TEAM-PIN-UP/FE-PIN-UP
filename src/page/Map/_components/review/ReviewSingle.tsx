import fullStar from "@/image/icons/blackStar.svg";
import emptyStar from "@/image/icons/emptyStar.svg";
import halfStar from "@/image/icons/halfBlackStar.svg";
import option from "@/image/icons/option.svg";
import styled from "styled-components";

import { Review } from "@/interface/review";
import { B3, B4, B5, B6, C2, D2, H4, H5 } from "@/style/font";

const ReviewSingle: React.FC<Review> = (data) => {
  const starShow = (score: number) => {
    const stars = [];
    let count = score;
    for (let i = 0; i < 5; i++) {
      if (count <= 0) {
        stars.push(<img src={emptyStar} alt="empty star" key={i} />);
      } else if (count >= 1) {
        stars.push(<img src={fullStar} alt="full star" key={i} />);
      } else if (count < 1 && count > 0) {
        stars.push(<img src={halfStar} alt="half star" key={i} />);
      }
      count--;
    }
    return stars;
  };

  return (
    <StReviewSingle>
      <div className="profileInfo">
        <div className="profileBucket">
          <img
            className="profileImg"
            src={data.writerProfileImageUrl}
            alt="profileImg"
          />
          <div className="profileDetail">
            <p className="name">{data.writerName}</p>
            <p className="reviewCount">총 리뷰 {data.writerTotalReviewCount}</p>
          </div>
        </div>
        <img src={option} />
      </div>
      <div className="reviewInfo">
        <div className="scoreBox">
          <p className="score">{data.starRating}</p>
          <div className="starBox">{starShow(data.starRating)}</div>
        </div>
        <p className="date">방문날짜 {data.visitedDate}</p>
      </div>
      <div className="reviewContent">{data.content}</div>
    </StReviewSingle>
  );
};

const StReviewSingle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 var(--spacing_20);
  box-sizing: border-box;
  gap: 12px;
  display: flex;
  flex-direction: column;
  .profileInfo {
    display: flex;
    justify-content: space-between;
    .profileBucket {
      display: flex;
      gap: 6px;
      .profileImg {
        width: 30px;
        height: 30px;
        border-radius: var(--radius_circle);
      }
      .profileDetail {
        display: flex;
        flex-direction: column;
        gap: 3px;
        .name {
          display: flex;
          ${H5}
          color : var(--neutral_800);
        }
        .reviewCount {
          ${B5}
          color : var(--neutral_500)
        }
      }
    }
  }
  .reviewInfo {
    display: flex;
    ${C2}
    .scoreBox {
      display: flex;
      margin-right: 8px;
      .score {
        ${B4}
      }
      .starBox {
        margin-left: 2px;
        img {
          width: 14px;
          height: 14px;
        }
      }
    }
    .date {
      color: var(--neutral_500);
    }
  }
  .reviewContent {
    display: flex;
    ${D2}
  }
  /* .bucket {
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
  } */
`;

export default ReviewSingle;
