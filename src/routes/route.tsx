import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../page/Landing";
import MapPage from "../page/Map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 최상위 경로로 App 설정
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
    ],
  },
]);

export default router;
