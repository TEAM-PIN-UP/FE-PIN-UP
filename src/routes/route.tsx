import App from "@/App";
import MyPlace from "@/pages/Bookmarks";
import ContentsPage from "@/pages/Contents";
import EditorArticlePage from "@/pages/EditorArticle";
import EditorPostPage from "@/pages/EditorArticle/EditorPost";
import MapPage from "@/pages/Map";
import PinbuddyList from "@/pages/PinbuddyList";
import PinbuddySearch from "@/pages/PinbuddySearch";
import PinBuddyLayout from "@/pages/PinbuddySearch/Layout";
import ProfilePage from "@/pages/Profile";
import EditProfile from "@/pages/Profile/EditProfile";
import Notifications from "@/pages/Profile/Notifications";
import PrivacyPolicy from "@/pages/Profile/PrivacyPolicy";
import Settings from "@/pages/Profile/Settings";
import TermsOfService from "@/pages/Profile/TermsOfService";
import { ReviewDetails } from "@/pages/Profile/_components/reviews/ReviewDetails";
import ReviewPage from "@/pages/Review";
import SignUpPage from "@/pages/SignUp";
import NaverAuthCallback from "@/pages/SignUp/_components/auth/NaverAuthCallback";
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
        path: paths.profile.settings.termsOfService,
        element: <TermsOfService />,
      },
      {
        path: paths.profile.settings.privacyPolicy,
        element: <PrivacyPolicy />,
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
