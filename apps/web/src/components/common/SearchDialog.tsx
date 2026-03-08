import { Dialog, Input } from "@erp-pro/ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "@/constants/Categories";
import { fuzzyMatch } from "@/utils/fuzzy";
import { useSearch } from "../context/SearchContext/useSearch";
import { FiFile, FiType, FiCircle, FiLayers, FiImage, FiSearch } from "react-icons/fi";
import { AiOutlineEnter } from "react-icons/ai";
import { IconType } from "react-icons";

interface SearchResult {
  categoryName: string;
  componentName: string;
}

function searchComponents(query: string): SearchResult[] {
  if (!query || query.trim() === '') return [];
  const results: SearchResult[] = [];
  CATEGORIES.forEach(category => {
    const { name: categoryName, subcategories } = category;
    if (fuzzyMatch(categoryName, query)) {
      subcategories.forEach(component => results.push({ categoryName, componentName: component }));
    } else {
      subcategories.forEach(component => {
        if (fuzzyMatch(component, query)) results.push({ categoryName, componentName: component });
      });
    }
  });
  return results;
}

interface AnimatedResultProps {
  children: React.ReactNode;
  delay?: number;
  dataIndex: number;
  onMouseEnter: () => void;
  onClick: () => void;
}

const AnimatedResult = ({ children, delay = 0, dataIndex, onMouseEnter, onClick }: AnimatedResultProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  return (
    <motion.div
      ref={ref}
      data-index={dataIndex}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  );
};

const categoryIconMapping: Record<string, IconType> = {
  'Get Started': FiFile,
  'Text Animations': FiType,
  'Animations': FiCircle,
  'Components': FiLayers,
  'Backgrounds': FiImage
};

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toggleSearch } = useSearch();

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchValue(inputValue);
      setSelectedIndex(-1);
    }, 300);
    return () => clearTimeout(t);
  }, [inputValue]);

  const results = searchComponents(searchValue);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDist = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDist / 50, 1));
  };

  useEffect(() => {
    if (!resultsRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = resultsRef.current;
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min((scrollHeight - (scrollTop + clientHeight)) / 50, 1)
    );
  }, [results]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      const slug = (str: string) => str.replace(/\s+/g, '-').toLowerCase();
      navigate(`/${slug(result.categoryName)}/${slug(result.componentName)}`);
      setInputValue('');
      setSearchValue('');
      setSelectedIndex(-1);
      onClose();
    },
    [navigate, onClose]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!searchValue || results.length === 0) return;

      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(p => (p + 1) % results.length);
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(p => (p - 1 + results.length) % results.length);
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [results, searchValue, selectedIndex, handleSelect]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !resultsRef.current) return;
    const container = resultsRef.current;
    const item = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
    if (!item) return;

    const margin = 50;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    if (itemTop < container.scrollTop + margin) {
      container.scrollTo({ top: itemTop - margin, behavior: 'smooth' });
    } else if (itemBottom > container.scrollTop + container.clientHeight - margin) {
      container.scrollTo({
        top: itemBottom - container.clientHeight + margin,
        behavior: 'smooth'
      });
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
      if (e.key === '/' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        toggleSearch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleSearch]);

  useEffect(() => {
    if (isOpen) return;
    setInputValue('');
    setSearchValue('');
    setSelectedIndex(-1);
    setTopGradientOpacity(0);
    setBottomGradientOpacity(1);
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
      title="Search Components"
      variant="default"
      animation="slideUp"
      widthClassName="max-w-2xl"
    >
      <div className="relative">
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Type to search..."
          className="w-full border-none   py-6 pl-12 pr-4 text-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
          autoFocus
          icon={<FiSearch />}
          iconClassName="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
        />
      </div>

      <AnimatePresence>
        {searchValue && (
          <motion.div
            key="results"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="relative mt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div
                ref={resultsRef}
                className="results-container max-h-[400px] overflow-y-auto pt-2"
                onScroll={handleScroll}
              >
                {results.length > 0 ? (
                  results.map((r, i) => {
                    const IconComp = categoryIconMapping[r.categoryName] ?? FiSearch;
                    const selected = i === selectedIndex;

                    return (
                      <AnimatedResult
                        key={`${r.categoryName}-${r.componentName}-${i}`}
                        delay={0.05}
                        dataIndex={i}
                        onMouseEnter={() => setSelectedIndex(i)}
                        onClick={() => handleSelect(r)}
                      >
                        <div
                          className={`
                            mb-2 flex items-center rounded-xl p-4 transition-colors
                            ${selected ? "bg-primary-500/10 dark:bg-primary-500/20 ring-1 ring-primary-500/30" : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"}
                          `}
                        >
                          <div className={`mr-4 p-2 rounded-lg ${selected ? "bg-primary-500 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"}`}>
                            <IconComp size={20} />
                          </div>

                          <div className="flex-1">
                            <div className={`text-md font-semibold ${selected ? "text-primary-600 dark:text-primary-400" : "text-neutral-900 dark:text-white"}`}>
                              {r.componentName}
                            </div>
                            <div className="text-xs text-neutral-500">
                              in {r.categoryName}
                            </div>
                          </div>

                          {selected && (
                            <div className="flex items-center gap-1 text-xs text-primary-500 font-medium">
                              <span>Select</span>
                              <AiOutlineEnter size={14} />
                            </div>
                          )}
                        </div>
                      </AnimatedResult>
                    );
                  })
                ) : (
                  <div className="py-12 text-center text-neutral-500">
                    No results found for{" "}
                    <span className="font-bold text-neutral-900 dark:text-white">"{searchValue}"</span>
                  </div>
                )}
              </div>

              {/* Gradient Overlays */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-8 bg-linear-to-b from-white dark:from-neutral-900 to-transparent transition-opacity duration-300"
                style={{ opacity: topGradientOpacity }}
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-white dark:from-neutral-900 to-transparent transition-opacity duration-300"
                style={{ opacity: bottomGradientOpacity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default SearchDialog;

