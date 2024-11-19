import Header from "@/components/Header";
import styled from "styled-components";

import chevronLeft from "@/image/icons/chevronLeft.svg";
import { H3 } from "@/style/font";
import { useViewStore, view } from "./ProfileViewStore";

export const ReviewDetails = () => {
  const { setCurrentView, setTransitionDirection } = useViewStore();

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
          <img src="https://picsum.photos/200" />
          <div className="username">
            <span>레벨조이</span>
            <span>리뷰 24</span>
          </div>
        </div>
        <span>점</span>
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

    .profile {
    }
    .username {
      display: flex;
      flex-direction: column;
    }
  }
`;
