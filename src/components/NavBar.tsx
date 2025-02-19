import bookMarkActive from "@/image/icons/bookmarkActive.svg";
import bookMarkInactive from "@/image/icons/bookmarkInActive.svg";
import contentsActive from "@/image/icons/contentsActive.svg";
import contentsInactive from "@/image/icons/contentsInactive.svg";
import mapPinActive from "@/image/icons/mapPinActive26.svg";
import mapPinInactive from "@/image/icons/mapPinInactive26.svg";
import profile from "@/image/icons/profile.jpg";
import uploadActive from "@/image/icons/uploadActive.svg";
import uploadInactive from "@/image/icons/uploadInactive.svg";
import checkLogin from "@/utils/checkLogin";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBarIcon from "./NavBarIcon";

interface styleProps {
  $path: string;
}

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const memberResponse = getMemberResponseObj();
  const isSignedIn = checkLogin();

  return (
    <StNavBar $path={location.pathname.split("/")[1]}>
      <NavBarIcon path="map" active={mapPinActive} inActive={mapPinInactive} />
      <NavBarIcon
        path="bookmark"
        active={bookMarkActive}
        inActive={bookMarkInactive}
      />
      <NavBarIcon
        path="review"
        active={uploadActive}
        inActive={uploadInactive}
      />
      <NavBarIcon
        path="contents"
        active={contentsActive}
        inActive={contentsInactive}
      />
      <div
        className="profileArea"
        onClick={() => {
          if (location.pathname.split("/")[1] !== "profile")
            navigate("/profile");
        }}
      >
        <img
          src={isSignedIn ? memberResponse?.profilePictureUrl : profile}
          className="profile"
        />
      </div>
    </StNavBar>
  );
};

const StNavBar = styled.div<styleProps>`
  background-color: var(--white);
  border-top: 1px solid var(--neutral_100);
  display: flex;
  justify-content: space-between;
  padding: var(--spacing_4) var(--spacing_20) var(--spacing_24);
  width: 100%;
  .profileArea {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 44px;
    .profile {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: ${(props) =>
        props.$path === "profile" ? "1.6px solid var(--black)" : "none"};
      box-sizing: border-box;
      cursor: ${(props) => (props.$path === "profile" ? "default" : "pointer")};
    }
  }
  .inactive {
    cursor: pointer;
  }
`;

export default NavBar;
