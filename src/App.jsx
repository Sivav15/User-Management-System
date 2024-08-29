import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import Login from './pages/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserManagement from './pages/UserManagement';
import UserProtectedRoute from './protected route/UserProtectedRoute';

const App = () => {


  const router = createBrowserRouter([

    {
      path: "*",
      element: <div>Not found</div>,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/user-management",
      element:
        <UserProtectedRoute>
          <UserManagement />
        </UserProtectedRoute>
      ,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App