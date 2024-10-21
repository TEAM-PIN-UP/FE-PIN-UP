import styled from "styled-components";

import NavBar from "@/components/NavBar";
import Toast from "./components/Toast";

interface layoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <StLayout>
      <Toast />
      <StContentContainer>{children}</StContentContainer>
      <StNavBarContainer>
        <NavBar />
      </StNavBarContainer>
    </StLayout>
  );
};

const StLayout = styled.div`
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
