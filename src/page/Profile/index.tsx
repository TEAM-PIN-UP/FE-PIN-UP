import styled from "styled-components";

import Profile from "./Profile";

const ProfilePage: React.FC = () => {
  return (
    <StDiv>
      <Profile />
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
