import styled from "styled-components";

import NavBar from "@/components/NavBar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

interface layoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <StLayout>
      <Toast />
      <Modal />
      <StContentContainer>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
        >
          {children}
        </GoogleOAuthProvider>
      </StContentContainer>
      <StNavBarContainer>
        <NavBar />
      </StNavBarContainer>
    </StLayout>
  );
};

const StLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const StContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  overflow: auto;
`;

const StNavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  z-index: 9999999;
`;

export default Layout;
