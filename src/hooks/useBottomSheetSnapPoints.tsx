import { useEffect, useRef, useState } from "react";

const useBottomSheetSnapPoints = () => {
  const [snapPoints, setSnapPoints] = useState([0.9, 0.5, 0.2]);
  const attachRef = useRef<HTMLDivElement>(null);
  const sheetHeaderRef = useRef<HTMLDivElement>(null);
  const searchHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        attachRef.current &&
        sheetHeaderRef.current &&
        searchHeaderRef.current
      ) {
        const screenHeight = window.innerHeight;
        const attachHeight = attachRef.current.offsetHeight;
        const navbarHeight = screenHeight - attachHeight;

        const sheetHeaderHeight = sheetHeaderRef.current.offsetHeight;
        const searchHeaderHeight = searchHeaderRef.current.offsetHeight;

        const snapPointValue =
          (sheetHeaderHeight + searchHeaderHeight + navbarHeight) /
          screenHeight;

        setSnapPoints((prev) => [prev[0], prev[1], snapPointValue]);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return { snapPoints, attachRef, sheetHeaderRef, searchHeaderRef };
};

export default useBottomSheetSnapPoints;
