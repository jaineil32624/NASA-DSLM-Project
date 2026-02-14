
import { lazy } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const GalleryPage = lazy(() => import('../pages/gallery/page'));
const HunchPage = lazy(() => import('../pages/hunch/page'));
const VideosPage = lazy(() => import('../pages/videos/page'));
const ResourcesPage = lazy(() => import('../pages/resources/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const UploadPage = lazy(() => import('../pages/upload/page'));
const AdminLoginPage = lazy(() => import('../pages/admin/login/page'));
const AdminDashboardPage = lazy(() => import('../pages/admin/dashboard/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/gallery',
    element: <GalleryPage />,
  },
  {
    path: '/hunch',
    element: <HunchPage />,
  },
  {
    path: '/videos',
    element: <VideosPage />,
  },
  {
    path: '/resources',
    element: <ResourcesPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/upload',
    element: <UploadPage />,
  },
  {
    path: '/admin',
    element: <Navigate to="/admin/login" replace />,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboardPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
