import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import MyPlace from "@/page/Bookmarks";
import ContentsPage from "@/page/Contents";
import EditorArticlePage from "@/page/EditorArticle";
import EditorPostPage from "@/page/EditorArticle/EditorPost";
import LandingPage from "@/page/Landing";
import MapPage from "@/page/Map";
import OtherProfile from "@/page/OtherProfile";
import PinbuddyList from "@/page/PinbuddyList";
import PinbuddySearch from "@/page/PinbuddySearch";
import PinBuddyLayout from "@/page/PinbuddySearch/Layout";
import ProfilePage from "@/page/Profile";
import EditProfile from "@/page/Profile/EditProfile";
import Notifications from "@/page/Profile/Notifications";
import Settings from "@/page/Profile/Settings";
import { ReviewDetails } from "@/page/Profile/_components/reviews/ReviewDetails";
import ReviewPage from "@/page/Review";
import SignUpPage from "@/page/SignUp";
import NaverAuthCallback from "@/page/SignUp/_components/auth/NaverAuthCallback";

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
        path: "/articles",
        element: <EditorArticlePage />,
      },
      {
        path: "/articles/post",
        element: <EditorPostPage />,
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
        path: "/bookmarks",
        element: <MyPlace />,
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
        path: "/profile/notifications",
        element: <Notifications />,
      },
      {
        path: "/profile/photo-review/:id",
        element: <ReviewDetails />,
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
        path: "/profile/pinbuddyList",
        element: <PinbuddyList />,
      },
      {
        path: "/profile/:uid",
        element: <OtherProfile />,
      },
      { path: "/profile/settings", element: <Settings /> },
      {
        path: "/profile/settings/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/auth/naver",
        element: <NaverAuthCallback />,
      },
    ],
  },
]);

export default router;
