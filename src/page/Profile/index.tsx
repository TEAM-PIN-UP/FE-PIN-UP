import styled from "styled-components";
import TransitionWrapper from "../SignUp/_components/TransitionWrapper";
import Profile from "./Profile";
import { ReviewDetails } from "./ReviewDetails";
import { useViewStore, view } from "./ViewStore";

const ProfilePage: React.FC = () => {
  const { currentView } = useViewStore();

  return (
    <StTransitionWrapper key={currentView} direction="forward">
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
