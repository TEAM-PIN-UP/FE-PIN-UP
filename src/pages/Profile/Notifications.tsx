import Header from "@/components/Header";
import TransitionWrapper from "@/components/TransitionWrapper";
import { useReceivedFriendRequests } from "@/hooks/api/pinBuddy/useFriendRequests";
import chevronLeft from "@/images/icons/chevronLeft.svg";
import defaultProfile from "@/images/icons/defaultProfile.png";
import { paths } from "@/routes/paths";
import { H3 } from "@/styles/font";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NotificationItem from "./_components/notifications/NotificationItem";

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { data: friendRequests } = useReceivedFriendRequests();

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
          <span className="header-title">알림</span>
        </Header.Center>
      </Header>
      <StTransitionWrapper duration={0.25}>
        <div className="notifications-groups">
          {/* <NotificationDateGroup date="오늘"> */}
          {friendRequests &&
            friendRequests.map((request) => (
              <NotificationItem
                profileImage={
                  request.sender.profilePictureUrl
                    ? request.sender.profilePictureUrl
                    : defaultProfile
                }
                username={request.sender.nickname}
                type="receivedRequestFromUser"
                isRead={false}
                onClick={() =>
                  navigate({
                    pathname: paths.profile.id(request.sender.memberId).friends,
                    search: new URLSearchParams({
                      list: "received",
                    }).toString(),
                  })
                }
              />
            ))}
          {friendRequests && friendRequests.length === 0 && (
            <div className="no-notifications">새로운 알림이 없어요.</div>
          )}
          {/* </NotificationDateGroup> */}
        </div>
      </StTransitionWrapper>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px var(--spacing_20);
  padding-top: 48px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;

  .back-button {
    cursor: pointer;
  }
  .header-title {
    ${H3}
  }
`;

const StTransitionWrapper = styled(TransitionWrapper)`
  width: 100%;
  height: 100%;
  padding-top: var(--spacing_20);
  box-sizing: border-box;

  .notifications-groups {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
    gap: var(--spacing_32);
  }
  .no-notifications {
    display: flex;
    flex-grow: 1;
    ${H3}
    color: var(--neutral_400);
    align-items: center;
    justify-content: center;
  }
`;

export default Notifications;
