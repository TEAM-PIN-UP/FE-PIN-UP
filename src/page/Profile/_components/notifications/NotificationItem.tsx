import React from "react";
import styled from "styled-components";

import chevronRight from "@/image/icons/chevronRight.svg";
import { B4 } from "@/style/font";

type NotificationType = "receivedRequestFromUser" | "userAcceptedRequest";

interface NotificationItemProps {
  profileImage: string;
  username: string;
  type: NotificationType;
  isRead: boolean;
  onClick?: () => void;
}

const notificationTextMap: Record<NotificationType, string> = {
  receivedRequestFromUser: "님이 핀버디를 신청했어요.",
  userAcceptedRequest: "님이 핀버디 수락을 완료했어요.",
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  profileImage,
  username,
  type,
  isRead,
  onClick,
}) => {
  return (
    <StDiv $isRead={isRead} onClick={onClick}>
      <div className="notification">
        <img src={profileImage} className="profile-image" />
        <span className="title">{`'${username}' ${notificationTextMap[type]}`}</span>
      </div>
      {type === "receivedRequestFromUser" && <img src={chevronRight} />}
    </StDiv>
  );
};

const StDiv = styled.div<{ $isRead: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--spacing_12) var(--spacing_16);
  box-sizing: border-box;
  border-radius: var(--radius_12);
  background-color: var(--neutral_50);
  cursor: pointer;

  opacity: ${({ $isRead }) => ($isRead ? "0.3" : "1.0")};

  .notification {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    width: 100%;
    gap: var(--spacing_8);

    .profile-image {
      width: 32px;
      height: 32px;
      object-fit: cover;
      border-radius: var(--radius_circle);
    }
    .title {
      ${B4}
    }
  }

  transition: transform 0.02s ease-in-out, background-color 0.02s ease-in-out;
  &:active {
    background-color: var(--neutral_100);
    transform: scale(0.97);
  }
`;

export default NotificationItem;
