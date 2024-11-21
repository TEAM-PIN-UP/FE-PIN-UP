import styled from "styled-components";

import Header from "@/components/Header";
import TransitionWrapper from "@/components/TransitionWrapper";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import { H3 } from "@/style/font";
import { useNavigate } from "react-router-dom";
import NotificationDateGroup from "./_components/notifications/NotificationDateGroup";
import NotificationItem from "./_components/notifications/NotificationItem";

const Notifications: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
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
          <span className="header-title">알림</span>
        </Header.Center>
      </Header>

      <StTransitionWrapper duration={0.25}>
        <div className="notifications-groups">
          <NotificationDateGroup date="오늘">
            <NotificationItem
              profileImage="https://picsum.photos/200"
              username="은채vv"
              type="receivedRequestFromUser"
              isRead={false}
            />
            <NotificationItem
              profileImage="https://picsum.photos/200"
              username="은채vv"
              type="userAcceptedRequest"
              isRead={true}
            />
          </NotificationDateGroup>
          <NotificationDateGroup date="10월 21일">
            <NotificationItem
              profileImage="https://picsum.photos/200"
              username="은채vv"
              type="receivedRequestFromUser"
              isRead={false}
            />
            <NotificationItem
              profileImage="https://picsum.photos/200"
              username="은채vv"
              type="receivedRequestFromUser"
              isRead={false}
            />{" "}
            <NotificationItem
              profileImage="https://picsum.photos/200"
              username="은채vv"
              type="receivedRequestFromUser"
              isRead={false}
            />
          </NotificationDateGroup>
          <NotificationDateGroup date="10월 20일">
            <NotificationItem
              profileImage="https://picsum.photos/200"
              username="은채vv"
              type="receivedRequestFromUser"
              isRead={false}
            />{" "}
            <NotificationItem
              profileImage="https://picsum.photos/200"
              username="은채vv"
              type="receivedRequestFromUser"
              isRead={false}
            />
            <NotificationItem
              profileImage="https://picsum.photos/200"
              username="은채vv"
              type="receivedRequestFromUser"
              isRead={false}
            />
          </NotificationDateGroup>
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

  .notifications-groups {
    display: flex;
    flex-direction: column;
    gap: var(--spacing_32);
  }
`;

export default Notifications;
