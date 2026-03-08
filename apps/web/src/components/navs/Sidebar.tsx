import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useLayoutEffect, useCallback, useMemo, memo, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, NEW, UPDATED } from '../../constants/Categories';
import { componentMap } from '../../constants/Components';
import { useSearch } from '../context/SearchContext/useSearch';
import { useTransition } from '../../hooks/useTransition';
import { getSavedComponents } from '../../utils/favorites';


interface SidebarProps {

}

const HOVER_TIMEOUT_DELAY = 150;
const ICON_BUTTON_STYLES = {
  rounded: '10px',
  border: '1px solid var(--color-gray-300)',
  bg: 'var(--color-background)'
};
const ARROW_ICON_PROPS = {
  boxSize: 4,
  transform: 'rotate(-45deg)'
};

const scrollToTop = () => window.scrollTo(0, 0);
const slug = (str: string) => str.replace(/\s+/g, '-').toLowerCase();
const toPascal = (str: string) =>
  str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');


const Sidebar = ({ }: SidebarProps) => {

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [linePosition, setLinePosition] = useState<number | null>(null);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [hoverLinePosition, setHoverLinePosition] = useState<number | null>(null);
  const [isHoverLineVisible, setIsHoverLineVisible] = useState(false);
  const [pendingActivePath, setPendingActivePath] = useState<string | null>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const sidebarContainerRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverDelayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [savedSet, setSavedSet] = useState<Set<string>>(() => new Set(getSavedComponents()));

  const location = useLocation();
  const navigate = useNavigate();
  const { toggleSearch } = useSearch();
  const { startTransition, isTransitioning } = useTransition();

  const findActiveElement = useCallback(() => {
    const activePath = pendingActivePath || location.pathname;

    for (const category of CATEGORIES) {
      const subPath = category.subcategories.find(sub => {
        return activePath === `/${slug(category.name)}/${slug(sub)}`;
      });

      if (subPath) {
        const isExpanded = expandedCategories[category.name];
        const subcategoryPath = `/${slug(category.name)}/${slug(subPath)}`;
        const subcategoryEl = itemRefs.current[subcategoryPath];
        const categoryHeaderEl = itemRefs.current[`category:${category.name}`];

        // If expanded and the subcategory element exists and is visible, use it
        if (isExpanded && subcategoryEl) {
          return subcategoryEl;
        }
        // Otherwise, use the category header
        if (categoryHeaderEl) {
          return categoryHeaderEl;
        }
      }
    }
    return null;
  }, [location.pathname, pendingActivePath, expandedCategories]);

  const updateLinePosition = useCallback((el: HTMLElement) => {
    if (!el || !sidebarRef.current) return null;

    // Check if element has valid dimensions (not hidden by CSS)
    const elRect = el.getBoundingClientRect();
    if (elRect.width === 0 || elRect.height === 0) return null;

    const sidebarRect = sidebarRef.current.getBoundingClientRect();
    const position = elRect.top - sidebarRect.top + elRect.height / 2;

    // Ensure the position is reasonable (not negative or way too large)
    // Negative positions mean the element is scrolled above the sidebar viewport
    if (position < 0 || position > sidebarRect.height + 1000) {
      return null;
    }

    return position;
  }, []);

  const toggleCategory = useCallback((name: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  }, []);

  const handleDrawerToggle = () => setDrawerOpen(p => !p);
  const closeDrawer = () => setDrawerOpen(false);
  const onSearchClick = () => {
    closeDrawer();
    toggleSearch();
  };
  const onNavClick = () => {
    closeDrawer();
    scrollToTop();
  };

  const handleTransitionNavigation = useCallback(
    async (path: string, subcategory: string) => {
      if (isTransitioning || location.pathname === path) return;

      setPendingActivePath(path);

      await startTransition(slug(subcategory), componentMap, () => {
        navigate(path);
        scrollToTop();
        setPendingActivePath(null);
      });
    },
    [isTransitioning, location.pathname, startTransition, navigate]
  );

  const handleMobileTransitionNavigation = useCallback(
    async (path: string, subcategory: string) => {
      if (isTransitioning || location.pathname === path) return;

      closeDrawer();
      setPendingActivePath(path);

      await startTransition(slug(subcategory), componentMap, () => {
        navigate(path);
        scrollToTop();
        setPendingActivePath(null);
      });
    },
    [isTransitioning, location.pathname, startTransition, navigate]
  );

  const onItemEnter = (path: string, e: React.MouseEvent<HTMLElement>) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (hoverDelayTimeoutRef.current) clearTimeout(hoverDelayTimeoutRef.current);

    const targetElement = e.currentTarget;

    const pos = updateLinePosition(targetElement);
    if (pos !== null) {
      setHoverLinePosition(pos);
    }

    hoverDelayTimeoutRef.current = setTimeout(() => {
      setIsHoverLineVisible(true);
    }, 200);
  };

  const onItemLeave = () => {
    if (hoverDelayTimeoutRef.current) clearTimeout(hoverDelayTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHoverLineVisible(false);
    }, HOVER_TIMEOUT_DELAY);
  };

  const scrollActiveItemIntoView = useCallback(() => {
    const activeEl = findActiveElement();
    if (activeEl && sidebarContainerRef.current) {
      const containerRect = sidebarContainerRef.current.getBoundingClientRect();
      const elementRect = activeEl.getBoundingClientRect();
      const offset = 100;

      const isElementAboveView = elementRect.top < containerRect.top + offset;
      const isElementBelowView = elementRect.bottom > containerRect.bottom - offset;

      if (isElementAboveView || isElementBelowView) {
        const scrollTop = sidebarContainerRef.current.scrollTop + (elementRect.top - containerRect.top) - offset;

        sidebarContainerRef.current.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }
  }, [findActiveElement]);

  useLayoutEffect(() => {
    const activeEl = findActiveElement();
    if (!activeEl) {
      setIsLineVisible(false);
      return;
    }
    const pos = updateLinePosition(activeEl);
    if (pos !== null) {
      setLinePosition(pos);
      setIsLineVisible(true);
    } else {
      setIsLineVisible(false);
    }
  }, [findActiveElement, updateLinePosition]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollActiveItemIntoView();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, scrollActiveItemIntoView]);

  useEffect(
    () => () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (hoverDelayTimeoutRef.current) clearTimeout(hoverDelayTimeoutRef.current);
    },
    []
  );

  useEffect(() => {
    if (pendingActivePath && location.pathname === pendingActivePath) {
      setPendingActivePath(null);
    }
  }, [location.pathname, pendingActivePath]);

  useEffect(() => {
    const sidebarElement = sidebarContainerRef.current;
    if (!sidebarElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = sidebarElement;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsScrolledToBottom(isAtBottom);
    };

    sidebarElement.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => sidebarElement.removeEventListener('scroll', handleScroll);
  }, []);

  // Keep favorites in sync so hearts update when user toggles favorites
  useEffect(() => {
    const updateSaved = () => setSavedSet(new Set(getSavedComponents()));
    const onStorage = (e: StorageEvent) => {
      if (!e || e.key === 'savedComponents') updateSaved();
    };
    window.addEventListener('favorites:updated', updateSaved);
    window.addEventListener('storage', onStorage);
    // Ensure initial sync
    updateSaved();
    return () => {
      window.removeEventListener('favorites:updated', updateSaved);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const setCategoryExpanded = useCallback((name: string, expanded: boolean) => {
    setExpandedCategories(prev => {
      if (prev[name] === expanded) return prev;
      return {
        ...prev,
        [name]: expanded
      };
    });
  }, []);

  return (
    <nav
      ref={sidebarContainerRef}
      className={`sidebar ${isScrolledToBottom ? "sidebar-no-fade" : ""} fixed top-[57px] h-screen w-0 md:w-40 p-5 overflow-y-auto `}
    >
      <div ref={sidebarRef} className="relative">
        {/* Active line */}
        <div
          className={[
            "absolute -left-px top-0 w-[4px] h-6 bg-primary rounded-full pointer-events-none z-[2]",
            "transition-all duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
            isLineVisible ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{
            transform:
              isLineVisible && linePosition !== null
                ? `translateY(${linePosition - 12}px)`
                : "translateY(-205px)",
          }}
        />

        {/* Hover line */}
        <div
          className={[
            "absolute -left-px top-0 w-[4px] h-6 bg-primary/40 rounded-[1px] pointer-events-none z-[1]",
            "transition-all duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
            isHoverLineVisible ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{
            transform:
              hoverLinePosition !== null
                ? `translateY(${hoverLinePosition - 12}px)`
                : "translateY(-100px)",
          }}
        />

        {/* VStack */}
        <div className="flex flex-col items-stretch space-y-4">
          {CATEGORIES.map((cat, index) => (
            <Category
              key={cat.name}
              category={cat}
              isExpanded={!!expandedCategories[cat.name]}
              toggleExpanded={() => toggleCategory(cat.name)}
              onExpandedChange={(expanded) => setCategoryExpanded(cat.name, expanded)}
              location={location}
              pendingActivePath={pendingActivePath}
              handleClick={scrollToTop}
              handleTransitionNavigation={handleTransitionNavigation}
              onItemMouseEnter={onItemEnter}
              onItemMouseLeave={onItemLeave}
              itemRefs={itemRefs}
              isTransitioning={isTransitioning}
              isFirstCategory={index === 0}
              savedSet={savedSet}
            />
          ))}
        </div>
      </div>
    </nav >
  )
}

type CategoryData = {
  name: string;
  subcategories: string[];
};

type SavedSetLike =
  | Set<string>
  | {
    has?: (key: string) => boolean;
  }
  | null
  | undefined;

type ItemRefs = React.MutableRefObject<Record<string, HTMLElement | null>>;

type CategoryProps = {
  category: CategoryData;
  isExpanded: boolean;
  toggleExpanded: () => void;
  onExpandedChange: (expanded: boolean) => void;
  handleClick: () => void;
  handleTransitionNavigation?: (path: string, sub: string) => void;
  location: { pathname: string };
  pendingActivePath?: string | null;
  onItemMouseEnter: (path: string, e: React.MouseEvent<HTMLElement>) => void;
  onItemMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
  itemRefs: ItemRefs;
  isTransitioning: boolean;
  isFirstCategory: boolean;
  savedSet?: SavedSetLike;
};

export const Category = memo(function Category({
  category,
  isExpanded,
  toggleExpanded,
  onExpandedChange,
  handleClick,
  handleTransitionNavigation,
  location,
  pendingActivePath,
  onItemMouseEnter,
  onItemMouseLeave,
  itemRefs,
  isTransitioning,
  isFirstCategory,
  savedSet,
}: CategoryProps) {

  const items = useMemo(() => {
    return category.subcategories.map((sub) => {
      const path = `/${slug(category.name)}/${slug(sub)}`;
      const activePath = pendingActivePath || location.pathname;
      const favoriteKey = `${toPascal(slug(category.name))}/${toPascal(slug(sub))}`;

      const hasFavorite =
        savedSet instanceof Set
          ? savedSet.has(favoriteKey)
          : !!savedSet?.has?.(favoriteKey);

      return {
        sub,
        path,
        isActive: activePath === path,
        isNew: NEW.includes(sub),
        isUpdated: UPDATED.includes(sub),
        isFavorited: hasFavorite,
      };
    });
  }, [category.name, category.subcategories, location.pathname, pendingActivePath, savedSet]);

  const activePath = pendingActivePath || location.pathname;
  const hasActiveItem = useMemo(() => items.some(item => item.isActive), [items]);
  const prevActivePathRef = useRef<string | null>(null);

  useEffect(() => {
    // Only auto-expand if the active path has changed and this category contains the active item
    if (hasActiveItem && prevActivePathRef.current !== activePath) {
      onExpandedChange(true);
      prevActivePathRef.current = activePath;
    }
    // Update the ref even if not expanding, to track the current active path
    if (hasActiveItem) {
      prevActivePathRef.current = activePath;
    }
  }, [hasActiveItem, activePath, onExpandedChange]);

  return (
    <>
      <div>
        <div
          ref={(el) => {
            if (itemRefs.current) itemRefs.current[`category:${category.name}`] = el;
          }}
          onClick={toggleExpanded}
          onMouseEnter={(e) => {
            // Show hover line on category header when it contains active item and is collapsed
            if (hasActiveItem && !isExpanded) {
              onItemMouseEnter(`category:${category.name}`, e);
            }
          }}
          onMouseLeave={(e) => {
            if (hasActiveItem && !isExpanded) {
              onItemMouseLeave(e);
            }
          }}
          className={[
            "category-header",
            "mb-2",
            isFirstCategory ? "mt-0" : "mt-4",
            hasActiveItem && !isExpanded ? "active-category-header" : "",
          ].join(" ")}
        >
          <span className="category-name m-2 relative z-1">{category.name}</span>
          {hasActiveItem && !isExpanded && (
            <motion.div
              layoutId="active-sidebar-pill"
              className="active-pill-background"
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
              }}
            />
          )}
          <svg
            className={["category-chevron", isExpanded ? "expanded" : ""].join(" ")}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  },
                  opacity: { duration: 0.2 }
                }
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  },
                  opacity: { duration: 0.2 }
                }
              }}
              className="category-content-wrapper"
            >
              <div className="category-content relative pl-4 border-l border-[#392e4e] flex flex-col space-y-2 pb-2">
                {items.map(({ sub, path, isActive, isNew, isUpdated, isFavorited }) => (
                  <Link
                    key={path}
                    to={path}
                    ref={(el) => {
                      if (itemRefs.current) itemRefs.current[path] = el;
                    }}
                    className={[
                      "sidebar-item",
                      isActive ? "active-sidebar-item" : "",
                      isTransitioning ? "transitioning" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={(e) => {
                      e.preventDefault();
                      if (handleTransitionNavigation) {
                        handleTransitionNavigation(path, sub);
                      } else {
                        handleClick();
                      }
                    }}
                    onMouseEnter={(e) => onItemMouseEnter(path, e)}
                    onMouseLeave={onItemMouseLeave}
                  >
                    <span className="inline-flex items-center ml-2 relative z-1">
                      {sub}
                      {isNew && <span className="new-tag ml-2">New</span>}
                      {isUpdated && <span className="updated-tag ml-2">Updated</span>}
                      {isFavorited && <span className="favorited-heart ml-2">❤️</span>}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="active-sidebar-pill"
                        className="active-pill-background"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
});


export default Sidebar;
