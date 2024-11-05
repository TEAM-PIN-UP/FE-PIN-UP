import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import bookMarkActive from "@/image/icons/bookmarkActive.svg";
import bookMarkInactive from "@/image/icons/bookmarkInActive.svg";
import contentsActive from "@/image/icons/contentsActive.svg";
import contentsInactive from "@/image/icons/contentsInactive.svg";
import mapPinActive from "@/image/icons/mapPinActive26.svg";
import mapPinInactive from "@/image/icons/mapPinInactive26.svg";
import profile from "@/image/icons/profile.jpg";
import uploadActive from "@/image/icons/uploadActive.svg";
import uploadInactive from "@/image/icons/uploadInactive.svg";

interface styleProps {
  $path: string;
}

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState<string>("/");

  useEffect(() => {
    setPath(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <StNavBar $path={path}>
      {path === "map" ? (
        <img src={mapPinActive} />
      ) : (
        <img
          src={mapPinInactive}
          className="inactive"
          onClick={() => navigate("/map")}
        />
      )}
      {path === "bookmark" ? (
        <img src={bookMarkActive} />
      ) : (
        <img
          src={bookMarkInactive}
          className="inactive"
          onClick={() => navigate("/bookmark")}
        />
      )}
      {path === "upload" ? (
        <img src={uploadActive} />
      ) : (
        <img
          src={uploadInactive}
          className="inactive"
          onClick={() => navigate("/review")}
        />
      )}
      {path === "contents" ? (
        <img src={contentsActive} />
      ) : (
        <img
          src={contentsInactive}
          className="inactive"
          onClick={() => navigate("/contents")}
        />
      )}
      <img
        src={profile}
        className="profile"
        onClick={() => {
          if (path !== "profile") navigate("/profile");
        }}
      />
    </StNavBar>
  );
};

const StNavBar = styled.div<styleProps>`
  background-color: var(--white);
  border-top: 1px solid var(--neutral_100);
  display: flex;
  justify-content: space-between;
  padding: var(--spacing_12) var(--spacing_20) var(--spacing_24);
  width: 100%;
  .profile {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: ${(props) =>
      props.$path === "profile" ? "1.6px solid var(--black)" : "none"};
    box-sizing: border-box;
    cursor: ${(props) => (props.$path === "profile" ? "default" : "pointer")};
  }
  .inactive {
    cursor: pointer;
  }
`;

export default NavBar;
