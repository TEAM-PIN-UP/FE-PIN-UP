import App from "@/App";
import MyPlace from "@/page/Bookmarks";
import ContentsPage from "@/page/Contents";
import EditorArticlePage from "@/page/EditorArticle";
import EditorPostPage from "@/page/EditorArticle/EditorPost";
import MapPage from "@/page/Map";
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
import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";

const router = createBrowserRouter([
  {
    path: paths.base,
    element: <App />, // 최상위 경로로 App 설정
    children: [
      {
        path: paths.base,
        element: <MapPage />,
      },
      {
        path: paths.articles,
        element: <EditorArticlePage />,
      },
      {
        path: paths.articles.post,
        element: <EditorPostPage />,
      },
      {
        path: paths.map,
        element: <MapPage />,
      },
      {
        path: paths.review,
        element: <ReviewPage />,
      },
      {
        path: paths.bookmarks,
        element: <MyPlace />,
      },
      {
        path: paths.contents,
        element: <ContentsPage />,
      },
      {
        path: paths.profile.notifications,
        element: <Notifications />,
      },
      {
        path: paths.profile.photoReview(":uid"),
        element: <ReviewDetails />,
      },
      {
        element: <PinBuddyLayout />,
        children: [
          {
            path: paths.profile.search,
            element: <PinbuddySearch />,
          },
        ],
      },
      { path: paths.profile.settings, element: <Settings /> },
      {
        path: paths.profile.settings.editProfile,
        element: <EditProfile />,
      },
      {
        path: paths.profile.id(":uid"),
        element: <ProfilePage />,
      },
      {
        path: paths.profile.id(":uid").friends,
        element: <PinbuddyList />,
      },
      {
        path: paths.signup,
        element: <SignUpPage />,
      },
      {
        path: paths.auth.naver,
        element: <NaverAuthCallback />,
      },
    ],
  },
]);

export default router;
