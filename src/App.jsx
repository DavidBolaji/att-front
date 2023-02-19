import DashboardPage from "./pages/Dashboard/DashboardPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import MainPage from "./pages/MainPage";
import AttendancePage, {
  loader as attendanceLoader,
} from "./pages/AttendancePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { checkAuth } from "./hooks/useAuth";
import RegisterPage from "./pages/RegisterPage";
import LogoutPage from "./pages/LogoutPage";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    loader: checkAuth,
    children: [
      { path: "", element: <MainPage /> },
      { path: "user", element: <UserPage /> },
      {
        path: "attendance",
        element: <AttendancePage />,
        loader: attendanceLoader,
      },
      { path: "logout", element: <LogoutPage /> },
      // { path: "/dashboard", element: <DashboardPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
