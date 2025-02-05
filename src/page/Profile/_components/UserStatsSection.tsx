import { B4, H4 } from "@/style/font";
import React from "react";
import styled from "styled-components";

export interface Stat {
  label: string;
  value: string | number;
}

interface StatsSectionProps {
  stats: Stat[];
}

const UserStatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <StDiv>
      <div className="stats-row">
        {stats.map((stat, index) => (
          <React.Fragment key={stat.label}>
            {index !== 0 && <div className="stat-divider" />}
            <div className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
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
    align-items: center;
    justify-content: space-between;
    margin: 0px var(--spacing_24);

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
`;

export default UserStatsSection;
