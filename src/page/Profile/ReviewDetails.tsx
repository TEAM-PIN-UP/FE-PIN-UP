import styled from "styled-components";

import Header from "@/components/Header";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import { B6, H3, H4 } from "@/style/font";
import { useViewStore, view } from "./ProfileViewStore";

export const ReviewDetails = () => {
  const { setCurrentView, setTransitionDirection, reviewId } = useViewStore();

  const handleClick = () => {
    setTransitionDirection("backward");
    setCurrentView(view.profileView);
  };

  return (
    <StDiv>
      <Header>
        <Header.Left>
          <img
            src={chevronLeft}
            className="back-button"
            onClick={handleClick}
          />
        </Header.Left>
        <Header.Center>
          <span className="header-title">리뷰 상세</span>
        </Header.Center>
      </Header>

      <div className="user-header">
        <div className="profile">
          <img src="https://picsum.photos/200" className="profile-image" />
          <div className="username">
            <span className="h4">레벨조이</span>
            <span className="b6">리뷰 24</span>
          </div>
        </div>
        <span>점</span>
      </div>
      <div className="review-images">
        <img
          src={`https://picsum.photos/200?random=${reviewId}`}
          className="image"
        />
      </div>
    </StDiv>
  );
};

const StDiv = styled.div`
  .back-button {
    cursor: pointer;
  }
  .header-title {
    ${H3}
  }

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
    }
  }

  .review-images {
    width: 100%;
    aspect-ratio: 1;

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .h4 {
    ${H4}
  }
  .b6 {
    ${B6}
  }
`;
