import { componentMap, findCatalogItemByRoute } from "@/catalog/registry";
import type { ComponentModule } from "@/catalog/registry";
import { useTransition } from "@/hooks/useTransition";
import { lazy, Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import CategoryRedirect from "@/routes/CategoryRedirect";

const lazyComponentMap = Object.fromEntries(
  Object.entries(componentMap).map(([slug, componentLoader]) => [
    slug,
    lazy(componentLoader),
  ]),
) as Record<string, ReturnType<typeof lazy<ComponentModule["default"]>>>;

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const { transitionPhase, getPreloadedComponent } = useTransition();
  const catalogItem = findCatalogItemByRoute(category, subcategory);

  const resolvedLabel = catalogItem?.name ?? subcategory ?? "";
  const isLoading = transitionPhase === "loading";
  const opacity = ["fade-out", "loading"].includes(transitionPhase) ? 0 : 1;
  const isGetStartedRoute = category === "get-started";
  const shouldRedirectToCategory = Boolean(category && !subcategory);
  const isCategoryIndexRoute = subcategory === "index";

  const preloaded = (
    subcategory ? getPreloadedComponent(subcategory) : null
  ) as ComponentModule | null;
  const SubcategoryComponent =
    preloaded?.default ||
    (subcategory ? (lazyComponentMap[subcategory] ?? null) : null);

  useEffect(() => {
    if (transitionPhase !== "fade-out") {
      try {
        window.scrollTo({ top: 0, behavior: "auto" });
      } catch {
        window.scrollTo(0, 0);
      }
    }
  }, [subcategory, transitionPhase]);

  useEffect(() => {
    if (resolvedLabel) {
      document.title = `erp-pro-ui - ${resolvedLabel}`;
    }
  }, [resolvedLabel]);

  if (shouldRedirectToCategory || isCategoryIndexRoute) {
    return <CategoryRedirect />;
  }

  return (
    <div className={`category-page ${isLoading ? "loading" : ""}`}>
      <div className="page-transition-fade" style={{ opacity }}>
        <h2
          className={`sub-category ${isGetStartedRoute ? "docs-category-title" : ""}`}
        >
          {resolvedLabel}
        </h2>

        {SubcategoryComponent ? (
          <Suspense
            fallback={
              <div className="fixed! inset-0 z-50 pointer-events-none antigravity-glow rounded-none" />
            }
          >
            <SubcategoryComponent />
          </Suspense>
        ) : (
          <div className="p-6">
            <p className=" font-bold text-2xl">Not found</p>
            <p className="text-gray-400 text-sm">
              This section is unavailable.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
