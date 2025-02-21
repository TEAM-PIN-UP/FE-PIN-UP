import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NaverAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const returnedState = urlParams.get("state");
      const storedState = sessionStorage.getItem("naverAuthState");

      if (!code || !returnedState || returnedState !== storedState) {
        console.error("State mismatch or missing values.");
        navigate("/");
        return;
      }
      sessionStorage.removeItem("naverAuthState");

      if (window.opener) {
        window.opener.postMessage(
          { code, state: returnedState },
          window.opener.location.origin
        );
        window.close();
      } else {
        navigate("/"); // Redirect if not in popup
      }
    };

    fetchToken();
  }, [navigate]);

  return (
    <StDiv>
      <p>네이버로 로그인하고 있어요...</p>
    </StDiv>
  );
};

const StDiv = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default NaverAuthCallback;
