import { Navigate, useParams, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../constants/Categories';

const slug = (str: string) => str.replace(/\s+/g, '-').toLowerCase();

/**
 * Redirects bare category URLs (e.g. /ui-basics/) to the first subcategory.
 */
export default function CategoryRedirect() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const category = pathParts[0];

  const cleanCategory = category?.replace(/\/+$/, '') || '';
  const match = CATEGORIES.find((cat) => slug(cat.name) === cleanCategory);

  if (match && match.subcategories.length > 0) {
    // Skip 'Search' entries — find the first real subcategory
    const firstSub = match.subcategories.find((sub) => sub !== 'Search');
    if (firstSub) {
      console.log('Redirecting to:', `/${category}/${slug(firstSub)}`);
      return <Navigate to={`/${category}/${slug(firstSub)}`} replace />;
    }
  }

  console.log('Fallback redirecting to landing');
  // Fallback: redirect to landing
  return <Navigate to="/" replace />;
}
