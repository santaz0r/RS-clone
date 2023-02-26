import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MainLayout from './layout/Main/MainLayout';
import AppLoader from './components/ui/hoc/AppLoader';
import Dashboard from './components/ui/Dashboard/Dashboard';
import Contacts from './pages/Contacts/Contacts';
import Sessions from './pages/Sessinos/Sessions';
import ManageSpecializations from './pages/Manage/ManageSpecializations';
import ProtectedRoute from './components/ui/hoc/ProtectedRoute';
import ProtectedAdminRoute from './components/ui/hoc/ProtectedAdminRoute';
import DoctorPage from './pages/DoctorPage/DoctorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedAdminRoute>
            <Dashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/doctor/:id" element={<DoctorPage />} />
      <Route
        path="/my-sessions"
        element={
          <ProtectedRoute>
            <Sessions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage/specializations"
        element={
          <ProtectedAdminRoute>
            <ManageSpecializations />
          </ProtectedAdminRoute>
        }
      />
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
