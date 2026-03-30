import { AnimatePresence, motion } from 'framer-motion';
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { CATEGORIES, NEW, UPDATED } from '../../constants/Categories';
import { componentMap } from '../../constants/Components';
import { useTransition } from '../../hooks/useTransition';
import { getSavedComponents } from '../../utils/favorites';

const HOVER_TIMEOUT_DELAY = 150;
const ACTIVE_LINE_CLASS_NAME =
  'absolute -left-px top-0 h-6 w-1 rounded-full bg-primary pointer-events-none z-2 transition-all duration-200 ease-in-out';
const HOVER_LINE_CLASS_NAME =
  'absolute -left-px top-0 h-6 w-1 rounded-[1px] bg-primary/40 pointer-events-none z-1 transition-all duration-200 ease-in-out';
const SIDEBAR_CONTENT_CLASS_NAME = 'flex flex-col items-stretch space-y-4';

const scrollToTop = () => window.scrollTo(0, 0);
const slug = (str: string) => str.replace(/\s+/g, '-').toLowerCase();
const toPascal = (str: string) =>
  str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

function useSavedComponentsSet(): Set<string> {
  const [savedSet, setSavedSet] = useState<Set<string>>(
    () => new Set(getSavedComponents()),
  );

  useEffect(() => {
    const updateSaved = () => setSavedSet(new Set(getSavedComponents()));
    const onStorage = (event: StorageEvent) => {
      if (!event || event.key === 'savedComponents') {
        updateSaved();
      }
    };

    window.addEventListener('favorites:updated', updateSaved);
    window.addEventListener('storage', onStorage);
    updateSaved();

    return () => {
      window.removeEventListener('favorites:updated', updateSaved);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return savedSet;
}

function useSidebarBottomFade(
  sidebarContainerRef: React.RefObject<HTMLElement | null>,
): boolean {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    const sidebarElement = sidebarContainerRef.current;
    if (!sidebarElement) {
      return;
    }

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = sidebarElement;
      setIsScrolledToBottom(scrollTop + clientHeight >= scrollHeight - 10);
    };

    sidebarElement.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => sidebarElement.removeEventListener('scroll', handleScroll);
  }, [sidebarContainerRef]);

  return isScrolledToBottom;
}

interface SidebarIndicatorLineProps {
  className: string;
  isVisible: boolean;
  position: number | null;
  hiddenOffset: number;
}

function SidebarIndicatorLine({
  className,
  isVisible,
  position,
  hiddenOffset,
}: SidebarIndicatorLineProps) {
  return (
    <div
      className={[className, isVisible ? 'opacity-100' : 'opacity-0'].join(' ')}
      style={{
        transform:
          isVisible && position !== null
            ? `translateY(${position - 12}px)`
            : `translateY(${hiddenOffset}px)`,
      }}
    />
  );
}

const Sidebar = () => {
  const [linePosition, setLinePosition] = useState<number | null>(null);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [hoverLinePosition, setHoverLinePosition] = useState<number | null>(
    null,
  );
  const [isHoverLineVisible, setIsHoverLineVisible] = useState(false);
  const [pendingActivePath, setPendingActivePath] = useState<string | null>(
    null,
  );
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const sidebarContainerRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverDelayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const savedSet = useSavedComponentsSet();
  const isScrolledToBottom = useSidebarBottomFade(sidebarContainerRef);

  const location = useLocation();
  const navigate = useNavigate();
  const { startTransition, isTransitioning } = useTransition();

  const findActiveElement = useCallback(() => {
    const activePath = pendingActivePath || location.pathname;

    for (const category of CATEGORIES) {
      const subPath = category.subcategories.find((sub) => {
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
    setExpandedCategories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }, []);

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
    [isTransitioning, location.pathname, startTransition, navigate],
  );

  const onItemEnter = (path: string, e: React.MouseEvent<HTMLElement>) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (hoverDelayTimeoutRef.current)
      clearTimeout(hoverDelayTimeoutRef.current);

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
    if (hoverDelayTimeoutRef.current)
      clearTimeout(hoverDelayTimeoutRef.current);
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
      const isElementBelowView =
        elementRect.bottom > containerRect.bottom - offset;

      if (isElementAboveView || isElementBelowView) {
        const scrollTop =
          sidebarContainerRef.current.scrollTop +
          (elementRect.top - containerRect.top) -
          offset;

        sidebarContainerRef.current.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
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
      if (hoverDelayTimeoutRef.current)
        clearTimeout(hoverDelayTimeoutRef.current);
    },
    [],
  );

  useEffect(() => {
    if (pendingActivePath && location.pathname === pendingActivePath) {
      setPendingActivePath(null);
    }
  }, [location.pathname, pendingActivePath]);

  const setCategoryExpanded = useCallback((name: string, expanded: boolean) => {
    setExpandedCategories((prev) => {
      if (prev[name] === expanded) return prev;
      return {
        ...prev,
        [name]: expanded,
      };
    });
  }, []);

  return (
    <nav
      ref={sidebarContainerRef}
      className={`sidebar ${isScrolledToBottom ? 'sidebar-no-fade' : ''} fixed top-14.25 h-screen w-0 overflow-y-auto p-5 md:w-40`}
    >
      <div ref={sidebarRef} className="relative">
        <SidebarIndicatorLine
          className={ACTIVE_LINE_CLASS_NAME}
          isVisible={isLineVisible}
          position={linePosition}
          hiddenOffset={-205}
        />
        <SidebarIndicatorLine
          className={HOVER_LINE_CLASS_NAME}
          isVisible={isHoverLineVisible}
          position={hoverLinePosition}
          hiddenOffset={-100}
        />

        <div className={SIDEBAR_CONTENT_CLASS_NAME}>
          {CATEGORIES.map((cat, index) => (
            <Category
              key={cat.name}
              category={cat}
              isExpanded={!!expandedCategories[cat.name]}
              toggleExpanded={() => toggleCategory(cat.name)}
              onExpandedChange={(expanded) =>
                setCategoryExpanded(cat.name, expanded)
              }
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
    </nav>
  );
};

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
  }, [
    category.name,
    category.subcategories,
    location.pathname,
    pendingActivePath,
    savedSet,
  ]);

  const activePath = pendingActivePath || location.pathname;
  const hasActiveItem = useMemo(
    () => items.some((item) => item.isActive),
    [items],
  );
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
            if (itemRefs.current)
              itemRefs.current[`category:${category.name}`] = el;
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
            'category-header',
            'mb-2',
            isFirstCategory ? 'mt-0' : 'mt-4',
            hasActiveItem && !isExpanded ? 'active-category-header' : '',
          ].join(' ')}
        >
          <span className="category-name m-2 relative z-1">
            {category.name}
          </span>
          {hasActiveItem && !isExpanded && (
            <motion.div
              layoutId="active-sidebar-pill"
              className="active-pill-background"
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 30,
              }}
            />
          )}
          <svg
            className={['category-chevron', isExpanded ? 'expanded' : ''].join(
              ' ',
            )}
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
                height: 'auto',
                opacity: 1,
                transition: {
                  height: {
                    type: 'spring',
                    stiffness: 350,
                    damping: 30,
                  },
                  opacity: { duration: 0.2 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    type: 'spring',
                    stiffness: 350,
                    damping: 30,
                  },
                  opacity: { duration: 0.2 },
                },
              }}
              className="category-content-wrapper"
            >
              <div className="category-content relative pl-4 border-l border-[#392e4e] flex flex-col space-y-2 pb-2">
                {items.map(
                  ({ sub, path, isActive, isNew, isUpdated, isFavorited }) => (
                    <Link
                      key={path}
                      to={path}
                      ref={(el) => {
                        if (itemRefs.current) itemRefs.current[path] = el;
                      }}
                      className={[
                        'sidebar-item',
                        isActive ? 'active-sidebar-item' : '',
                        isTransitioning ? 'transitioning' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
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
                        {isUpdated && (
                          <span className="updated-tag ml-2">Updated</span>
                        )}
                        {isFavorited && (
                          <span className="favorited-heart ml-2">❤️</span>
                        )}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="active-sidebar-pill"
                          className="active-pill-background"
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  ),
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
});

export default Sidebar;
