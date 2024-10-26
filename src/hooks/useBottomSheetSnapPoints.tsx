import { useCallback, useEffect, useRef, useState } from "react";

const useBottomSheetSnapPoints = () => {
  const [snapPoints, setSnapPoints] = useState([0.95, 0.5, 0.25]);

  const attachRef = useRef<HTMLDivElement>(null);
  const sheetHeaderRef = useRef<HTMLDivElement>(null);
  const searchHeaderRef = useRef<HTMLDivElement>(null);

  const calculateSnapPoints = useCallback(() => {
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

      const topSnap = (screenHeight - 28) / screenHeight;
      const bottomSnap =
        (sheetHeaderHeight + searchHeaderHeight + navbarHeight) / screenHeight;

      setSnapPoints([topSnap, 0.5, bottomSnap]);
    }
  }, []);

  // ResizeObserver tracks component size changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      calculateSnapPoints();
    });

    if (attachRef.current) resizeObserver.observe(attachRef.current);
    if (sheetHeaderRef.current) resizeObserver.observe(sheetHeaderRef.current);
    if (searchHeaderRef.current)
      resizeObserver.observe(searchHeaderRef.current);

    return () => resizeObserver.disconnect();
  }, [calculateSnapPoints]);

  // Update snap points on window resize
  useEffect(() => {
    const handleResize = () => calculateSnapPoints();
    window.addEventListener("resize", handleResize);

    calculateSnapPoints();

    return () => window.removeEventListener("resize", handleResize);
  }, [calculateSnapPoints]);

  return { snapPoints, attachRef, sheetHeaderRef, searchHeaderRef };
};

export default useBottomSheetSnapPoints;
