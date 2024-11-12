import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface NavbarIconProps {
  path: string;
  active: string;
  inActive: string;
}

const NavBarIcon: React.FC<NavbarIconProps> = ({ path, active, inActive }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {path === location.pathname.split("/")[1] ? (
        <StIconArea>
          <img src={active} />
        </StIconArea>
      ) : (
        <StIconArea onClick={() => navigate(`/${path}`)}>
          <img src={inActive} className="inactive" />
        </StIconArea>
      )}
    </>
  );
};

const StIconArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 44px;
`;

export default NavBarIcon;
