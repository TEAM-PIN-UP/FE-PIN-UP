import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import NavBar from "./components/NavBar";

function App(): React.JSX.Element {
  return (
    <AppContainer>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <NavBarContainer>
        <NavBar />
      </NavBarContainer>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  overflow: auto;
`;

const NavBarContainer = styled.div`
  height: auto;
  width: 100%;
  z-index: 9999999;
`;
