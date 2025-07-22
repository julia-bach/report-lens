import { RefObject, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useWindowHeightStore } from "@/store/window-height-store";

interface UseComponentSizeOptions {
  minus?: number;
  inverse?: boolean;
}

export const useComponentSize = (ref: RefObject<any>, options: UseComponentSizeOptions = {}) => {
  const { minus = 0, inverse = false } = options;
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { height: windowsHeight } = useWindowHeightStore(useShallow((state) => state));

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) {
        return;
      }
      const entry = entries[0];
      setSize({
        width: inverse ? (windowsHeight - entry.contentRect.width - minus) :  (entry.contentRect.width - minus) ,
        height: inverse ? (windowsHeight - entry.contentRect.height - minus) :  (entry.contentRect.height - minus)
      });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, windowsHeight]);

  return size;
};

export const useWindowHeight = () => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    const onResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return height;
};