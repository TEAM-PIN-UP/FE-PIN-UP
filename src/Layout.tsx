import styled from "styled-components";

import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.visualViewport?.height || window.innerHeight);
    };

    window.visualViewport?.addEventListener("resize", updateHeight);
    window.addEventListener("resize", updateHeight);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const excludeNavBarRoutes = ["/auth/naver"];
  return (
    <StLayout $dynamicHeight={height}>
      <Toast />
      <Modal />
      <StContentContainer>{children}</StContentContainer>
      {/* NavBar conditional rendering */}
      {!excludeNavBarRoutes.includes(location.pathname) && (
        <StNavBarContainer>
          <NavBar />
        </StNavBarContainer>
      )}
    </StLayout>
  );
};

const StLayout = styled.div<{ $dynamicHeight: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: ${(props) => props.$dynamicHeight}px;
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
