import { createBrowserRouter, Outlet } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import QuizRoom from './pages/QuizRoom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage'

const Root = () => (
  <>
    <Navbar />
    <Outlet/>
  </>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children:[
      {
        index: true,
        element: <LandingPage/>
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/',
        element: <SocketProvider><Dashboard /></SocketProvider>,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/admin',
        element: <SocketProvider><Admin /></SocketProvider>,
      },
      {
        path: '/quiz/:quizId',
        element: <SocketProvider><QuizRoom /></SocketProvider>,
      },
    ]
  }
 
]);
