import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

const focusableSelectors = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
];

const scheduleMicrotask = (callback: () => void) => {
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(callback);
    return;
  }
  Promise.resolve()
    .then(callback)
    .catch(() => {
      callback();
    });
};

export const useBodyScrollLock = (active: boolean) => {
  useEffect(() => {
    if (!active || typeof window === 'undefined') return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [active]);
};

export const useFocusTrap = (
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
) => {
  useEffect(() => {
    if (!active || typeof window === 'undefined') return;
    const container = containerRef.current;
    if (!container) return;

    const getFocusable = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelectors.join(',')),
      ).filter(
        (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
      );

    const focusable = getFocusable();
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || focusable.length === 0) return;
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          (last || first)?.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        (first || last)?.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, active]);
};

export const useOverlayEffects = (
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
) => {
  useBodyScrollLock(active);
  useFocusTrap(containerRef, active);
};

export const useOverlayTransition = (open: boolean, duration = 200) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      return undefined;
    }

    scheduleMicrotask(() => setClosing(true));
    const timer = setTimeout(() => setClosing(false), duration);

    return () => {
      clearTimeout(timer);
      scheduleMicrotask(() => setClosing(false));
    };
  }, [open, duration]);

  const shouldRender = open || closing;
  const transitionState: 'open' | 'closing' | 'closed' = open
    ? 'open'
    : closing
      ? 'closing'
      : 'closed';

  return { shouldRender, transitionState };
};
