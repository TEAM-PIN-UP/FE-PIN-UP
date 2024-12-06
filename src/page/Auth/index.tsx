import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthSuccessPage: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const code = params.get("code");

  useEffect(() => {
    const getTokens = async () => {
      const tokens = await axios.get(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/auth/login/google/callback`,
        {
          params: {
            code: code,
          },
        }
      );

      console.log(tokens);
    };

    if (code) getTokens();
    else console.log("No google oauth code detected.");
  }, [code]);

  return <div>Success</div>;
};

export default AuthSuccessPage;
