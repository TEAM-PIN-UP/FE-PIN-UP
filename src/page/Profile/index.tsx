import styled from "styled-components";

import Profile from "./Profile";
import { useViewStore, view } from "./ProfileViewStore";
import { ReviewDetails } from "./ReviewDetails";

const ProfilePage: React.FC = () => {
  const { currentView } = useViewStore();

  return (
    <StDiv>
      <div
        className={`view-container ${
          currentView === view.profileView ? "active" : ""
        }`}
      >
        <Profile />
      </div>
      <div
        className={`view-container ${
          currentView === view.reviewDetailView ? "active" : ""
        }`}
      >
        <ReviewDetails />
      </div>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  .view-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: none;

    &.active {
      display: block;
    }
  }
`;

export default ProfilePage;
