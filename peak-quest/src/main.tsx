import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";
import SelectArea from "./pages/user/SelectArea";
import Main from "./pages/user/Main";
import CourseList from "./pages/user/CourseList";
import CourseDetail from "./pages/user/CourseDetail";
import CourseEdit from "./pages/user/CourseEdit";
import MyPage from "./pages/user/MyPage";
import MyCourseList from "./pages/user/MyCourseList";
import WishList from "./pages/user/WishList";
import Admin from "./Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import Banner from "./pages/admin/Banner";
import BannerEdit from "./pages/admin/BannerEdit";
import User from "./pages/admin/User";
import Report from "./pages/admin/Report";
import BadgeList from "./pages/user/BadgeList";
import DashBoard from "./pages/admin/DashBoard";
import ProtectedRoute from "./pages/admin/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      { path: "/area", element: <SelectArea /> },
      { path: "/area/:AreaName/courselist", element: <CourseList /> },
      {
        path: "/area/:AreaName/courselist/coursedetail/:courseId",
        element: <CourseDetail />,
      },
      { path: "/area/create", element: <CourseEdit /> },
      { path: "/area/create/:courseId", element: <CourseEdit /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/mypage/mycourselist", element: <MyCourseList /> },
      { path: "/mypage/wishlist", element: <WishList /> },
      { path: "/mypage/badgelist", element: <BadgeList /> },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <AdminLogin />,
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute requireAdmin>
            <DashBoard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/banner",
        element: (
          <ProtectedRoute requireAdmin>
            <Banner />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/banner/edit",
        element: (
          <ProtectedRoute requireAdmin>
            <BannerEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/banner/edit/:bannerId",
        element: (
          <ProtectedRoute requireAdmin>
            <BannerEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/report",
        element: (
          <ProtectedRoute requireAdmin>
            <Report />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/user",
        element: (
          <ProtectedRoute requireAdmin>
            <User />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
