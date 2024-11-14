import styled from "styled-components";

import Header from "@/components/Header";
import { H2 } from "@/style/font";
import StatsSection, { Stat } from "./_components/StatsSection";

const userStats: Stat[] = [
  { label: "리뷰", value: 8 },
  { label: "평균 평점", value: 4.5 },
  { label: "핀버디", value: 552 },
];

const ProfilePage: React.FC = () => {
  return (
    <StDiv>
      <Header>
        <Header.Left>
          <span className="h2">My</span>
        </Header.Left>
        <Header.Right>
          <span className="h2">알림</span>
          <span className="h2">설정</span>
        </Header.Right>
      </Header>
      <StatsSection
        username="레벨조이"
        profileImg="https://picsum.photos/200"
        stats={userStats}
      />
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  padding-top: 48px;

  .h2 {
    ${H2}
  }
`;

export default ProfilePage;
