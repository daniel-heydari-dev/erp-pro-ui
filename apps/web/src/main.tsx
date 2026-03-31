import React, { Suspense, lazy } from "react";
import { createRoot, type Root } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider, ToastProvider } from "erp-pro-ui";

import "./styles.css";

const AppProvidersLayout = lazy(() => import("./layouts/AppProvidersLayout"));
const SidebarLayout = lazy(() => import("./layouts/SidebarLayout"));
const CategoryPage = lazy(() => import("./routes/CategoryPage"));
const CategoryRedirect = lazy(() => import("./routes/CategoryRedirect"));
const LandingPage = lazy(() => import("./routes/LandingPage"));

function RouteFallback() {
  return (
    <main
      className="flex min-h-screen items-center justify-center text-sm text-neutral-500"
      aria-busy="true"
    >
      Loading...
    </main>
  );
}

function renderRoute(children: React.ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

const router = createBrowserRouter(
  [
    {
      element: renderRoute(<AppProvidersLayout />),
      children: [
        {
          path: "/",
          element: renderRoute(<LandingPage />),
        },
        {
          path: "/:category",
          element: renderRoute(<CategoryRedirect />),
        },
        {
          path: "/:category/:subcategory",
          element: renderRoute(
            <SidebarLayout>
              <CategoryPage />
            </SidebarLayout>,
          ),
        },
        {
          path: "*",
          element: renderRoute(<CategoryRedirect />),
        },
      ],
    },
  ],
  {
    basename: "/erp-pro-ui",
  },
);

type RootCache = typeof globalThis & {
  __erpProUiRoot?: Root;
};

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

const rootCache = globalThis as RootCache;
const root = rootCache.__erpProUiRoot ?? createRoot(rootElement);

rootCache.__erpProUiRoot = root;

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
