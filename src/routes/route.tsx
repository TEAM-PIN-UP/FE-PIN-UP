import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import BookmarkPage from "@/page/Bookmark";
import ContentsPage from "@/page/Contents";
import LandingPage from "@/page/Landing";
import MapPage from "@/page/Map";
import ProfilePage from "@/page/Profile";
import ReviewPage from "@/page/Review";

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
      {
        path: "/review",
        element: <ReviewPage />,
      },
      {
        path: "/bookmark",
        element: <BookmarkPage />,
      },
      {
        path: "/contents",
        element: <ContentsPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
