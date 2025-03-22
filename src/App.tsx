import { createBrowserRouter, Outlet } from "react-router-dom";
import { SocketProvider } from "./contexts/SocketContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import QuizRoom from "./pages/QuizRoom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AuthProvider from "./contexts/AuthContext";
import { UserTypes } from "./enums/userTypes";
import ProtectedRoute from "./utils/ProtectedRoute ";

const Root = () => (
  <>
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  </>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute allowedRoles={[UserTypes.Admin]}>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/quiz/:quizId",
        element: (
          <SocketProvider>
            <QuizRoom />
          </SocketProvider>
        ),
      },
    ],
  },
]);
