import { createContext, useState } from "react";

import SearchDialog from "@/search/SearchDialog";

export interface SearchContextType {
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  isSearchOpen: boolean;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);
  const toggleSearch = () => setSearchOpen((previousValue) => !previousValue);

  const value = { openSearch, closeSearch, toggleSearch, isSearchOpen };

  return (
    <SearchContext.Provider value={value}>
      {children}
      <SearchDialog isOpen={isSearchOpen} onClose={closeSearch} />
    </SearchContext.Provider>
  );
}
