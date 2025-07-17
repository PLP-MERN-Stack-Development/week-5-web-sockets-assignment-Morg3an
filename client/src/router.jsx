import { createBrowserRouter } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';

// Components
import ProtectedRoutes from './components/ProtectedRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/chat',
    element: (
      <ProtectedRoutes>
        <ChatPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: '*',
    element: (
      <div className="p-8 text-center text-xl text-red-500">
        404 - Page not found
      </div>
    ),
  },
]);

export default router;