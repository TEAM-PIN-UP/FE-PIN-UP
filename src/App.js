import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Home from './pages/Home';
import Search from './pages/Search';
import Place from './pages/Place';
import Review from './pages/Review';
import Friend from './pages/Friend';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const MainLayout = () => (
  <div>
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: '/main',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      { path: 'search', element: <Search /> },
      { path: 'place', element: <Place /> },
      { path: 'review', element: <Review /> },
      { path: 'friend', element: <Friend /> },
      { path: 'profile', element: <Profile /> },    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;