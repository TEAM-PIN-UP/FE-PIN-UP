import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import { H3 } from "@/style/font";

const PinBuddyLayout: React.FC = () => {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <>
      <StPinBuddyLayout>
        <Header>
          <Header.Left className="backButton">
            {" "}
            <img
              src={chevronLeft}
              className="back-button"
              onClick={handleClick}
            />
          </Header.Left>
          <Header.Center className="center">핀버디 추가</Header.Center>
        </Header>
        <Outlet />
      </StPinBuddyLayout>
    </>
  );
};

const StPinBuddyLayout = styled.div`
  width: 100%;
  .backButton {
    cursor: pointer;
  }
  .center {
    ${H3}
  }
`;

export default PinBuddyLayout;
