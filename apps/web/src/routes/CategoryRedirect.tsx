import { Navigate, useParams } from "react-router-dom";

import { findCatalogCategory } from "@/catalog/registry";

/**
 * Redirects bare category URLs (e.g. /ui-basics/) to the first subcategory.
 */
export default function CategoryRedirect() {
  const { category } = useParams();

  const cleanCategory = category?.replace(/\/+$/, "") || "";
  const match = findCatalogCategory(cleanCategory);

  if (match && match.items.length > 0) {
    return <Navigate to={`/${match.slug}/${match.items[0].slug}`} replace />;
  }

  return <Navigate to="/" replace />;
}
