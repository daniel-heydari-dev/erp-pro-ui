import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider, ToastProvider } from 'erp-pro-ui';

import CategoryPage from './pages/CategoryPage';
import CategoryRedirect from './pages/CategoryRedirect';
import LandingPage from './pages/LandingPage';
import AppProvidersLayout from './components/layout/AppProvidersLayout';
import SidebarLayout from './components/layout/SidebarLayout';
import './styles.css';

const router = createBrowserRouter(
  [
    {
      element: <AppProvidersLayout />,
      children: [
        {
          path: '/',
          element: <LandingPage />,
        },
        {
          path: '/:category',
          element: <CategoryRedirect />,
        },
        {
          path: '/:category/:subcategory',
          element: (
            <SidebarLayout>
              <CategoryPage />
            </SidebarLayout>
          ),
        },
        {
          path: '*',
          element: <CategoryRedirect />,
        },
      ],
    },
  ],
  {
    basename: '/erp-pro-ui',
  },
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
