import styled from "styled-components";
import TransitionWrapper from "../../components/TransitionWrapper";
import Profile from "./Profile";
import { useViewStore, view } from "./ProfileViewStore";
import { ReviewDetails } from "./ReviewDetails";

const ProfilePage: React.FC = () => {
  const { currentView, direction } = useViewStore();

  return (
    <StTransitionWrapper key={currentView} direction={direction}>
      {currentView === view.profileView && <Profile />}
      {currentView === view.reviewDetailView && <ReviewDetails />}
    </StTransitionWrapper>
  );
};

const StTransitionWrapper = styled(TransitionWrapper)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default ProfilePage;
