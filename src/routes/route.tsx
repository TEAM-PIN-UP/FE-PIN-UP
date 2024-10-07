import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../page/Landing";
import MapPage from "../page/Map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/map",
    element: <MapPage />,
  },
]);

export default router;
