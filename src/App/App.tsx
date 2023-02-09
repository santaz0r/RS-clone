import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MainLayout from './layout/Main/MainLayout';
import Test from './pages/otherPage/test';
import AppLoader from './components/ui/hoc/AppLoader';
import Dashboard from './components/ui/Dashboard/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="test" element={<Test />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<h1>Not Found</h1>} />
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
