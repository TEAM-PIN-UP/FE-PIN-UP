import Header from "@/components/Header";
import chevronLeft from "@/images/icons/chevronLeft.svg";
import { H3 } from "@/styles/font";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const PinBuddyLayout: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      <StPinBuddyLayout>
        <Header>
          <Header.Left className="backButton">
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
