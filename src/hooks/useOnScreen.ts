// src/hooks/useOnScreen.ts
import { useState, useEffect, RefObject } from 'react';

export function useOnScreen<T extends Element>(
  ref: RefObject<T>,
  rootMargin = '0px'
) {
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, rootMargin]);
  return isVisible;
}
