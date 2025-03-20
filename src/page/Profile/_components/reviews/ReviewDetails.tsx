import Header from "@/components/Header";
import TransitionWrapper from "@/components/TransitionWrapper";
import useCheckLoginAndRoute from "@/hooks/useCheckLoginAndRoute";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import defaultProfile from "@/image/icons/defaultProfile.svg";
import moreDotsGray from "@/image/icons/moreDotsGray.svg";
import { MemberDetails } from "@/interface/member";
import { PhotoReview } from "@/interface/review";
import { B6, H3, H4 } from "@/style/font";
import useToastPopup from "@/utils/toastPopup";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReviewText from "./ReviewText";

export const ReviewDetails: React.FC = () => {
  useCheckLoginAndRoute();
  const navigate = useNavigate();
  const toast = useToastPopup();
  const location = useLocation();
  const writer = useRef(location.state.writer as MemberDetails);
  const review = location.state.review as PhotoReview;

  useEffect(() => {
    if (!review) {
      toast("상세 리뷰를 불러오지 못했어요.");
      navigate(-1);
    }
    if (!writer.current) {
      writer.current = {
        profilePictureUrl: defaultProfile,
        nickname: "",
        reviewCount: 0,
      } as MemberDetails;
    }
  }, [review, navigate, toast]);

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
              src={writer.current.profilePictureUrl}
              className="profile-image"
            />
            <div className="username">
              <span className="h4">{writer.current.nickname}</span>
              <div className="review-count">
                <span className="b6 gray">리뷰</span>
                <span className="b6">{writer.current.reviewCount}</span>
              </div>
            </div>
          </div>
          <img src={moreDotsGray} className="more-dots" />
        </div>
        <div className="review-images">
          <img src={review.reviewImageUrls[0]} className="image" />
        </div>
        <ReviewText item={review} userName="나" />
      </StTransitionWrapper>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;

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
