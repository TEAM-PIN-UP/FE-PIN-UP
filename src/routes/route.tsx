import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import BookmarkPage from "@/page/Bookmark";
import ContentsPage from "@/page/Contents";
import LandingPage from "@/page/Landing";
import MapPage from "@/page/Map";
import ProfilePage from "@/page/Profile";
import ReviewPage from "@/page/Review";
import SignUpPage from "@/page/SignUp";
import PinbuddySearch from "@/page/PinbuddySearch";
import PinBuddyLayout from "@/page/PinbuddySearch/Layout";
import OtherProfile from "@/page/OtherProfile";

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
      {
        element: <PinBuddyLayout />,
        children: [
          {
            path: "/profile/pinbuddySearch",
            element: <PinbuddySearch />,
          },
        ],
      },
      {
        path: "/profile/:nickname",
        element: <OtherProfile />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;
