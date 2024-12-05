import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import AuthSuccessPage from "@/page/Auth";
import BookmarkPage from "@/page/Bookmark";
import ContentsPage from "@/page/Contents";
import EditorArticlePage from "@/page/EditorArticle";
import LandingPage from "@/page/Landing";
import MapPage from "@/page/Map";
import OtherProfile from "@/page/OtherProfile";
import PinbuddySearch from "@/page/PinbuddySearch";
import PinBuddyLayout from "@/page/PinbuddySearch/Layout";
import ProfilePage from "@/page/Profile";
import EditProfile from "@/page/Profile/EditProfile";
import Notifications from "@/page/Profile/Notifications";
import { ReviewDetails } from "@/page/Profile/_components/reviews/ReviewDetails";
import ReviewPage from "@/page/Review";
import SignUpPage from "@/page/SignUp";

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
        path: "/auth/success",
        element: <AuthSuccessPage />,
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
        path: "/profile/:nickname",
        element: <OtherProfile />,
      },
      {
        path: "/profile/settings/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;
