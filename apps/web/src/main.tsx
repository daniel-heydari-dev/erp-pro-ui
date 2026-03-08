import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import CategoryRedirect from './pages/CategoryRedirect';
import LandingPage from './pages/LandingPage';
import { ThemeProvider, ToastProvider } from '@erp-pro/ui';
import { TransitionProvider } from './components/context/TransitionContext/TransitionContext';
import { SearchProvider } from './components/context/SearchContext/SearchContext';
import SidebarLayout from './components/layout/SidebarLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/:category",
    element: <CategoryRedirect />,
  },
  {
    path: "/:category/:subcategory",
    element: (
      <TransitionProvider>
        <SearchProvider>
          <SidebarLayout>
            <CategoryPage />
          </SidebarLayout>
        </SearchProvider>
      </TransitionProvider>
    ),
  },
  {
    path: "*",
    element: <CategoryRedirect />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
);