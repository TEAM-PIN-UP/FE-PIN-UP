import { useCallback, useEffect, useRef, useState } from "react";

const useBottomSheetSnapPoints = () => {
  const [snapPoints, setSnapPoints] = useState([0.95, 0.5, 0.25]);

  const attachRef = useRef<HTMLDivElement>(null);
  const sheetHeaderRef = useRef<HTMLDivElement>(null);

  const calculateSnapPoints = useCallback(() => {
    if (attachRef.current && sheetHeaderRef.current) {
      const screenHeight = window.innerHeight;
      const attachHeight = attachRef.current.offsetHeight;
      const navbarHeight = screenHeight - attachHeight;

      const sheetHeaderHeight = sheetHeaderRef.current.offsetHeight;

      const topSnap = -28 / screenHeight;
      const bottomSnap = (sheetHeaderHeight + navbarHeight) / screenHeight;

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

    return () => resizeObserver.disconnect();
  }, [calculateSnapPoints]);

  // Update snap points on window resize
  useEffect(() => {
    const handleResize = () => calculateSnapPoints();
    window.addEventListener("resize", handleResize);

    calculateSnapPoints();

    return () => window.removeEventListener("resize", handleResize);
  }, [calculateSnapPoints]);

  return { snapPoints, attachRef, sheetHeaderRef };
};

export default useBottomSheetSnapPoints;
