import customAxios from "@/api/Interceptor";
import Header from "@/components/Header";
import TransitionWrapper from "@/components/TransitionWrapper";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import { H3 } from "@/style/font";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SettingsGroup from "./_components/setttings/SettingsGroup";
import SettingsItem from "./_components/setttings/SettingsItem";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await customAxios.post(`/api/auth/logout`, null, {
        headers: { Access: localStorage.getItem("accessToken") },
      });
    } catch (error) {
      console.warn("Logout request failed, proceeding anyway.", error);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/signup");
  };

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
          <span className="header-title">설정</span>
        </Header.Center>
      </Header>

      <StTransitionWrapper duration={0.25}>
        <SettingsGroup title="계정 설정" />
        <SettingsItem title="프로필 편집" type="arrow" />
        <SettingsItem
          title="계정 정보"
          type="text"
          description={`SNS 로그인\n${getMemberResponseObj()?.email}`}
        />

        <SettingsGroup title="고객센터" />
        <SettingsItem title="문의하기" type="arrow" />
        <SettingsItem title="건의하기" type="arrow" />
        <SettingsItem title="이용약관" type="arrow" />
        <SettingsItem title="개인정보 처리방침" type="arrow" />

        <SettingsGroup title="기타" />
        <SettingsItem title="앱버전" type="text" description="V.0.1 (최신)" />
        <SettingsItem title="로그아웃" type="text" onClick={handleSignOut} />
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
`;

export default Settings;
