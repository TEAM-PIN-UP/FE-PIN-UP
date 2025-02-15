import Header from "@/components/Header";
import TransitionWrapper from "@/components/TransitionWrapper";
import useCheckLoginAndRoute from "@/hooks/useCheckLoginAndRoute";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import moreDotsGray from "@/image/icons/moreDotsGray.svg";
import { Review } from "@/interface/review";
import { B6, H3, H4 } from "@/style/font";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReviewText from "./ReviewText";
import getMemberResponseObj from "@/utils/getMemberResponseObj";

export const ReviewDetails: React.FC = () => {
  useCheckLoginAndRoute();
  const navigate = useNavigate();
  const location = useLocation();
  const detail = location.state.item as Review;
  const memberResponse = getMemberResponseObj();

  useEffect(() => {
    if (!detail) navigate("/profile");
  }, [detail, navigate]);

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
            <img
              src={memberResponse?.profilePictureUrl}
              className="profile-image"
            />
            <div className="username">
              <span className="h4">{memberResponse?.nickname}</span>
              <div className="review-count">
                <span className="b6 gray">리뷰</span>
                <span className="b6">{}</span>
              </div>
            </div>
          </div>
          <img src={moreDotsGray} className="more-dots" />
        </div>
        <div className="review-images">
          <img src={detail.reviewImageUrls[0]} className="image" />
        </div>
        <ReviewText
          id={detail.reviewId}
          placeName={detail.placeName}
          userName="나"
          score={detail.starRating.toFixed(1).toString()}
          reviewDate={detail.createdAt}
          body={detail.content}
          visitDate={detail.visitedDate}
        />
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
