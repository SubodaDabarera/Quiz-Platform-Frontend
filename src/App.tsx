import { createBrowserRouter } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
// import Admin from './pages/Admin';
// import QuizRoom from './pages/QuizRoom';

export const router = createBrowserRouter([
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
  // {
  //   path: '/admin',
  //   element: <SocketProvider><Admin /></SocketProvider>,
  // },
  // {
  //   path: '/quiz/:quizId',
  //   element: <SocketProvider><QuizRoom /></SocketProvider>,
  // },
]);
