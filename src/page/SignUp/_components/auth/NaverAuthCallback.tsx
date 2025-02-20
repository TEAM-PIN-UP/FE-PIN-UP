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

      //   try {
      //     // Request token from naver
      //     const response = await axios.get(
      //       "https://nid.naver.com/oauth2.0/token",
      //       {
      //         params: {
      //           grant_type: "authorization_code",
      //           client_id: import.meta.env.VITE_NAVER_AUTH_CLIENT_ID,
      //           client_secret: import.meta.env.VITE_NAVER_AUTH_CLIENT_SECRET,
      //           code,
      //           state: returnedState,
      //         },
      //       }
      //     );

      //     const { access_token, refresh_token } = response.data;

      //     localStorage.setItem("accessToken", access_token);
      //     localStorage.setItem("refreshToken", refresh_token);

      if (window.opener) {
        window.opener.postMessage(
          // { access_token },
          { code, state: returnedState },
          window.opener.location.origin
        );
        window.close();
      } else {
        navigate("/"); // Redirect if not in popup
      }
      //   } catch (error) {
      //     console.error("Error fetching access token:", error);
      //     navigate("/");
      //   }
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
