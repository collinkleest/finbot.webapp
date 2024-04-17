import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './components/Home'
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import ChatPage from './components/Chat';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegistrationPage />
  },
  {
    path: '/chat',
    element: <ChatPage />
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
