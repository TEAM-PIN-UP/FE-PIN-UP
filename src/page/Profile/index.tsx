import Header from "@/components/Header";
import { H2 } from "@/style/font";
import styled from "styled-components";

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
    </StDiv>
  );
};

const StDiv = styled.div`
  padding-top: 48px;

  .h2 {
    ${H2}
  }
`;

export default ProfilePage;
