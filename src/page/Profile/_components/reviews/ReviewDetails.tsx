import getApi from "@/api/getApi";
import Header from "@/components/Header";
import TransitionWrapper from "@/components/TransitionWrapper";
import useCheckLoginAndRoute from "@/hooks/useCheckLoginAndRoute";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import moreDotsGray from "@/image/icons/moreDotsGray.svg";
import { ReviewDetail } from "@/interface/review";
import { B6, H3, H4 } from "@/style/font";
import useToastPopup from "@/utils/toastPopup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ReviewText from "./ReviewText";
import getMemberResponseObj from "@/utils/getMemberResponseObj";

export const ReviewDetails: React.FC = () => {
  useCheckLoginAndRoute();
  const navigate = useNavigate();
  const toast = useToastPopup();
  const { id } = useParams();
  const [detail, setDetail] = useState<ReviewDetail>();

  const memberResponse = getMemberResponseObj();

  useEffect(() => {
    const fetchReviewDetail = async () => {
      if (!id) return;
      try {
        const response = await getApi.getReviewId({ id });
        setDetail(response.data);
      } catch (error) {
        toast("리뷰를 불러올 수 없어요.");
        console.error("Error fetching review details:", error);
        navigate(-1);
      }
    };

    fetchReviewDetail();
  }, [id, navigate, toast]);

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
          <img src={detail?.imageUrls[0]} className="image" />
        </div>
        {detail?.id && (
          <ReviewText
            id={detail?.id}
            placeName=""
            userName="나"
            score={detail.starRating.toFixed(1).toString()}
            reviewDate="24.10.17"
            body={detail.content}
            visitDate="2024년 10월 31일"
          />
        )}
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
