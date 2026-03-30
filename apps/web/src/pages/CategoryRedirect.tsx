import { Navigate, useParams } from 'react-router-dom';
import { CATEGORIES } from '../constants/Categories';

const slug = (str: string) => str.replace(/\s+/g, '-').toLowerCase();

/**
 * Redirects bare category URLs (e.g. /ui-basics/) to the first subcategory.
 */
export default function CategoryRedirect() {
  const { category } = useParams();

  const cleanCategory = category?.replace(/\/+$/, '') || '';
  const match = CATEGORIES.find((cat) => slug(cat.name) === cleanCategory);

  if (match && match.subcategories.length > 0) {
    const firstSub = match.subcategories.find((sub) => sub !== 'Search');
    if (firstSub) {
      return <Navigate to={`/${category}/${slug(firstSub)}`} replace />;
    }
  }

  return <Navigate to="/" replace />;
}
