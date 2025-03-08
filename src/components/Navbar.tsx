import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {UserTypes} from '../enums/userTypes'

export default function Navbar() {
  const {getToken, logout} = useAuth()
  const user = getToken()

  const isAuthenticated = !!user?.token;
  const isAdmin = user?.role === UserTypes.Admin

  const handleLogout = async () => {
    try {
      await logout()
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">QuizHub</Link>
        
        <div className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-blue-300">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>
          {isAdmin && <Link to="/admin" className="hover:text-blue-300">Admin</Link>}
          
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}