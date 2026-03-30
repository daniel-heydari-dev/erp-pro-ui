import { componentMap } from '@/constants/Components';
import { useTransition } from '@/hooks/useTransition';
import { decodeLabel } from '@/utils/utils';
import { lazy, Suspense, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import IndexPage from './IndexPage';
import CategoryRedirect from './CategoryRedirect';

interface CategoryPageProps {}

const CategoryPage = ({}: CategoryPageProps) => {
  const { category, subcategory } = useParams();
  const { transitionPhase, getPreloadedComponent } = useTransition();

  if (category && !subcategory) {
    return <CategoryRedirect />;
  }

  const decodedLabel = decodeLabel(subcategory || '');
  const isLoading = transitionPhase === 'loading';
  const opacity = ['fade-out', 'loading'].includes(transitionPhase) ? 0 : 1;
  const isGetStartedRoute = category === 'get-started';
  const isIndexPage = subcategory === 'index';

  const componentFactory = subcategory && componentMap[subcategory];
  const preloaded = (
    subcategory ? getPreloadedComponent(subcategory) : null
  ) as { default: React.ComponentType<any> } | null;
  const SubcategoryComponent =
    preloaded?.default || (componentFactory ? lazy(componentFactory) : null);

  useEffect(() => {
    if (transitionPhase !== 'fade-out') {
      try {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } catch {
        window.scrollTo(0, 0);
      }
    }
  }, [subcategory, transitionPhase]);

  useEffect(() => {
    if (decodedLabel) {
      document.title = `erp-pro-ui - ${decodedLabel}`;
    }
  }, [decodedLabel]);

  return isIndexPage ? (
    <IndexPage />
  ) : (
    <div className={`category-page ${isLoading ? 'loading' : ''}`}>
      <div className="page-transition-fade" style={{ opacity }}>
        <h2
          className={`sub-category ${isGetStartedRoute ? 'docs-category-title' : ''}`}
        >
          {decodedLabel}
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
