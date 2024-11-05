import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import BookmarkPage from "@/page/Bookmark";
import ContentsPage from "@/page/Contents";
import LandingPage from "@/page/Landing";
import MapPage from "@/page/Map";
import ProfilePage from "@/page/Profile";
import SignUpPage from "@/page/SignUp";
import UploadPage from "@/page/Upload";

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
        path: "/upload",
        element: <UploadPage />,
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
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;
