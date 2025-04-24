import bookMarkActive from "@/image/icons/bookmarkActive.svg";
import bookMarkInactive from "@/image/icons/bookmarkInActive.svg";
import contentsActive from "@/image/icons/contentsActive.svg";
import contentsInactive from "@/image/icons/contentsInactive.svg";
import defaultProfile from "@/image/icons/defaultProfile.png";
import mapPinActive from "@/image/icons/mapPinActive26.svg";
import mapPinInactive from "@/image/icons/mapPinInactive26.svg";
import uploadActive from "@/image/icons/uploadActive.svg";
import uploadInactive from "@/image/icons/uploadInactive.svg";
import { paths } from "@/routes/paths";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBarIcon from "./NavBarIcon";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const memberResponse = getMemberResponseObj();
  const memberId = memberResponse?.memberId;
  if (!memberId) {
    // console.error("No member id in Navbar");
    return <></>;
  }

  {
    /* NavBar conditional rendering */
  }
  const excludeNavBarRoutes = [paths.auth.naver, paths.signup];
  if (excludeNavBarRoutes.includes(location.pathname)) return <></>;

  const isMyProfile = () => {
    const path = location.pathname.split("/");
    return path[1] === "profile" && path[2] === String(memberId);
  };
  const handleProfileClick = () => {
    if (!isMyProfile()) navigate(`..${paths.profile.id(memberId)}`);
  };

  return (
    <StNavBar $profileStyle={isMyProfile()}>
      <NavBarIcon
        path={paths.map}
        active={mapPinActive}
        inActive={mapPinInactive}
      />
      <NavBarIcon
        path={paths.bookmarks}
        active={bookMarkActive}
        inActive={bookMarkInactive}
      />
      <NavBarIcon
        path={paths.review}
        active={uploadActive}
        inActive={uploadInactive}
      />
      <NavBarIcon
        path={paths.contents}
        active={contentsActive}
        inActive={contentsInactive}
      />
      <div className="profileArea" onClick={handleProfileClick}>
        <img
          src={
            memberResponse?.profilePictureUrl !== ""
              ? memberResponse?.profilePictureUrl
              : defaultProfile
          }
          className="profile"
        />
      </div>
    </StNavBar>
  );
};

const StNavBar = styled.div<{ $profileStyle: boolean }>`
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
        props.$profileStyle ? "1.6px solid var(--black)" : "none"};
      box-sizing: border-box;
      cursor: ${(props) => (props.$profileStyle ? "default" : "pointer")};
    }
  }
`;

export default NavBar;
