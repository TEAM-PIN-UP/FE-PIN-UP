import blackStar from "@/image/icons/blackStar.svg";
import chevronRight from "@/image/icons/chevronRightBlack.svg";
import { Review } from "@/interface/review";
import { B3, B4, B5, B6, H3, H4 } from "@/style/font";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ReviewTextProps {
  item: Review;
  userName: string;
}

const ReviewText: React.FC<ReviewTextProps> = ({ item, userName }) => {
  const navigate = useNavigate();

  return (
    <StDiv>
      <div className="header">
        <span>{item.placeName}</span>
        <button className="see-map-button">
          <img
            src={chevronRight}
            onClick={() => {
              const params = new URLSearchParams({
                kakaoPlaceId: item.kakaoPlaceId,
              });
              navigate(`/map?${params.toString()}`);
            }}
          />
        </button>
      </div>
      <div className="divider" />

      <div className="review">
        <div className="review-title">
          <span className="h3">{userName}</span>
          <img src={blackStar} className="star" />
          <span className="score b3">
            {item.starRating.toFixed(1).toString()}
          </span>
          <span className="review-date b5 gray">{item.createdAt}</span>
        </div>
        <div className="review-body">
          <span>{item.content}</span>
        </div>
      </div>

      <div className="visit-date">
        <span>방문 날짜 {item.visitedDate}</span>
      </div>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  background-color: var(--white);
  padding: var(--spacing_8) 0px;

  .header {
    ${H4}
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing_16) var(--spacing_20);
    box-sizing: content-box;
    height: 17px;

    .see-map-button {
      display: flex;
      align-items: center;
      justify-content: center;
      color: transparent;
      background-color: transparent;
      border: none;
      border-radius: var(--radius_circle);
      width: 32px;
      height: 32px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: var(--neutral_100);
      }
    }
  }

  .divider {
    height: 1px;
    background-color: var(--neutral_100);
    margin: 0px var(--spacing_20);
  }

  .review {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding: var(--spacing_16) var(--spacing_20);
    gap: 4px;

    .review-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;

      .star {
        width: 16px;
        height: 16px;
        margin-left: 4px;
      }
      .score {
        margin-left: 2px;
      }
      .review-date {
        margin-left: 8px;
      }
    }

    .review-body {
      ${B4}
      line-height: 160%;
    }
  }

  .visit-date {
    ${B6}
    color:var(--neutral_400);
    text-align: end;
    padding: var(--spacing_4) var(--spacing_20);
  }

  .h3 {
    ${H3}
  }
  .b3 {
    ${B3}
  }
  .b5 {
    ${B5}
  }
  .gray {
    color: var(--neutral_400);
  }
`;

export default ReviewText;
