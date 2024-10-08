import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../page/Landing";
import MapPage from "../page/Map";
import UploadPage from "../page/Upload";
import BookmarkPage from "../page/Bookmark";
import ContentsPage from "../page/Contents";

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
    ],
  },
]);

export default router;
