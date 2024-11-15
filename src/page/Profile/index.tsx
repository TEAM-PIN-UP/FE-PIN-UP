import styled from "styled-components";

import Header from "@/components/Header";
import { H2, H4 } from "@/style/font";
import ProfileButton from "./_components/ProfileButton";
import UserIntroInput from "./_components/UserIntroInput";
import UserStatsSection, { Stat } from "./_components/UserStatsSection";

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
      <div className="profile">
        <img src={"https://picsum.photos/200"} className="profile-image" />
        <UserStatsSection stats={userStats} />
      </div>
      <div className="username">레벨조이</div>
      <UserIntroInput />
      <div className="profile-buttons">
        <ProfileButton icon="" text="핀버디 추가" />
        <ProfileButton icon="" text="프로필 공유" />
      </div>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  padding-top: 48px;

  .profile {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    padding: var(--spacing_20);
    align-items: center;
  }

  .profile-image {
    width: 56px;
    height: 56px;
    background-size: cover;
    background-position: center;
    border-radius: var(--radius_circle);
  }

  .username {
    ${H4}
    display: flex;
    justify-content: start;
    padding: 0px var(--spacing_20);
    margin-bottom: var(--spacing_16);
  }

  .profile-buttons {
    display: flex;
    flex-direction: row;
    margin-top: var(--spacing_20);
    padding: 0px var(--spacing_20);
    gap: var(--spacing_12);
  }

  .h2 {
    ${H2}
  }
`;

export default ProfilePage;
