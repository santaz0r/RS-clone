import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MainLayout from './layout/Main/MainLayout';
import Test from './pages/otherPage/test';
import LoginLayout from './layout/Login/Login';
import AppLoader from './components/ui/hoc/AppLoader';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="test" element={<Test />} />
      <Route path=":type?" element={<LoginLayout />} />
    </Route>,
  ),
);

function App() {
  return (
    <AppLoader>
      <RouterProvider router={router} />
    </AppLoader>
  );
}

export default App;
