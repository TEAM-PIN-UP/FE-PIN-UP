import styled from "styled-components";

import Header from "@/components/Header";
import TransitionWrapper from "@/components/TransitionWrapper";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import moreDotsGray from "@/image/icons/moreDotsGray.svg";
import { B6, H3, H4 } from "@/style/font";
import { useNavigate, useParams } from "react-router-dom";
import ReviewText from "./_components/reviews/ReviewText";

export const ReviewDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <StDiv>
      <Header>
        <Header.Left>
          <img
            src={chevronLeft}
            className="back-button"
            onClick={() => navigate(-1)}
          />
        </Header.Left>
        <Header.Center>
          <span className="header-title">리뷰 상세</span>
        </Header.Center>
      </Header>

      <StTransitionWrapper duration={0.25}>
        <div className="user-header">
          <div className="profile">
            <img src="https://picsum.photos/200" className="profile-image" />
            <div className="username">
              <span className="h4">레벨조이</span>
              <div className="review-count">
                <span className="b6 gray">리뷰</span>
                <span className="b6">24</span>
              </div>
            </div>
          </div>
          <img src={moreDotsGray} className="more-dots" />
        </div>
        <div className="review-images">
          <img
            src={`https://picsum.photos/200?random=${id}`}
            className="image"
          />
        </div>

        <ReviewText />
      </StTransitionWrapper>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  height: 100%;

  .back-button {
    cursor: pointer;
  }
  .header-title {
    ${H3}
  }

  .h4 {
    ${H4}
  }
  .b6 {
    ${B6}
  }
  .gray {
    color: var(--neutral_500);
  }
`;

const StTransitionWrapper = styled(TransitionWrapper)`
  .user-header {
    display: flex;
    flex-direction: row;
    padding: var(--spacing_12) var(--spacing_16);
    margin-top: var(--spacing_48);
    align-items: center;
    justify-content: space-between;

    .profile {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: start;
      gap: 8px;

      .profile-image {
        width: 36px;
        height: 36px;
        border-radius: var(--radius_circle);
      }

      .username {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .review-count {
        display: flex;
        flex-direction: row;
        gap: 2px;
      }
    }

    .more-dots {
      cursor: pointer;
    }
  }

  .review-images {
    width: 100%;
    aspect-ratio: 1;
    margin-bottom: var(--spacing_8);

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
