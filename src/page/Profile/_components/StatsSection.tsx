import { B4, H4 } from "@/style/font";
import React from "react";
import styled from "styled-components";

export interface Stat {
  label: string;
  value: string | number;
}

interface StatsSectionProps {
  username: string;
  profileImg: string;
  stats: Stat[];
}

const StatsSection: React.FC<StatsSectionProps> = ({
  username,
  profileImg,
  stats,
}) => {
  return (
    <StDiv>
      <div className="stats-row">
        <img src={profileImg} alt="User" className="profile-image" />

        {stats.map((stat, index) => (
          <>
            {index !== 0 && <div className="stat-divider" />}
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </>
        ))}
      </div>

      <div className="username">{username}</div>
    </StDiv>
  );
};

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .stats-row {
    display: flex;
    flex-direction: row;
    padding: var(--spacing_20);
    align-items: center;
    justify-content: space-between;

    .profile-image {
      width: 56px;
      height: 56px;
      background-size: cover;
      background-position: center;
      border-radius: var(--radius_circle);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      width: 48px;
      gap: var(--spacing_4);
    }
    .stat-value {
      ${H4}
      height: 17px;
    }
    .stat-label {
      ${B4}
      color: var(--neutral_500);
      height: 16px;
    }
    .stat-divider {
      width: 1px;
      height: 24px;
      background-color: var(--neutral_200);
    }
  }

  .username {
    ${H4}
    display: flex;
    justify-content: start;
    padding: 0px var(--spacing_20);
  }
`;

export default StatsSection;
