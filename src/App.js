import './App.css';
import HomeLayout from './components/HomeLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import TvShow from './components/TvShow';
import { checkAuthValidation } from './util/checkAuthValidation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { path: '/tv-show', element: <TvShow />, loader: checkAuthValidation }
    ]
  },
  { path: '/login', element: <Login /> }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
