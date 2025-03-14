import { H4 } from "@/style/font";
import React from "react";
import styled from "styled-components";

interface NotificationDateHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date: string;
}

const NotificationDateHeader: React.FC<NotificationDateHeaderProps> = ({
  children,
  date,
}) => {
  return (
    <StDiv>
      <div className="date">{date}</div>
      <div className="notifications">{children}</div>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;

  .date {
    ${H4}
    text-align: start;
    margin-bottom: var(--spacing_12);
  }

  .notifications {
    display: flex;
    flex-direction: column;
    gap: var(--spacing_16);
  }
`;

export default NotificationDateHeader;
