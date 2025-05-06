import apiAxios from "@/api/interceptors";
import Header from "@/components/Header";
import TransitionWrapper from "@/components/TransitionWrapper";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import { paths } from "@/routes/paths";
import { ModalProps } from "@/store/modalStore";
import { H3 } from "@/style/font";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import useModalPopup from "@/utils/modalPopup";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SettingsGroup from "./_components/setttings/SettingsGroup";
import SettingsItem from "./_components/setttings/SettingsItem";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalPopup();
  const signoutModal: ModalProps = {
    type: "cancel-ok",
    title: "로그아웃 하시겠어요?",
    body: ["아쉬워요 😥", "언제든 다시 놀러오세요!"],
    okButtonText: "로그아웃",
    onOkButtonClick: async () => {
      try {
        await apiAxios.post(`/api/auth/logout`, null, {
          headers: { Access: localStorage.getItem("accessToken") },
        });
      } catch (error) {
        console.warn("Logout request failed, proceeding anyway.", error);
      } finally {
        localStorage.clear();
        navigate(paths.signup);
        closeModal();
      }
    },
    cancelButtonText: "취소",
    onCancelButtonClick: () => {
      closeModal();
    },
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
        <SettingsItem
          title="프로필 편집"
          type="arrow"
          onClick={() => navigate(paths.profile.settings.editProfile)}
        />
        <SettingsItem
          title="계정 정보"
          type="text"
          description={`SNS 로그인\n${getMemberResponseObj()?.email}`}
        />

        <SettingsGroup title="고객센터" />
        <SettingsItem
          title="문의하기"
          type="arrow"
          onClick={() => window.open(import.meta.env.VITE_CS_ASK, "_blank")}
        />
        <SettingsItem
          title="건의하기"
          type="arrow"
          onClick={() => window.open(import.meta.env.VITE_CS_REQUEST, "_blank")}
        />
        <SettingsItem
          title="이용약관"
          type="arrow"
          onClick={() => navigate(paths.profile.settings.termsOfService)}
        />
        <SettingsItem
          title="개인정보 처리방침"
          type="arrow"
          onClick={() => navigate(paths.profile.settings.privacyPolicy)}
        />

        <SettingsGroup title="기타" />
        <SettingsItem title="앱버전" type="text" description="V.0.1 (최신)" />
        <SettingsItem
          title="로그아웃"
          type="text"
          onClick={() => openModal(signoutModal)}
        />
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
`;

export default Settings;
