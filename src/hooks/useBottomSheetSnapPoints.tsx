import { useEffect, useRef, useState } from "react";

const useBottomSheetSnapPoints = () => {
  const [snapPoints, setSnapPoints] = useState([0.9, 0.5, 0.2]);
  const attachRef = useRef<HTMLDivElement>(null);
  const sheetHeaderRef = useRef<HTMLDivElement>(null);
  const searchHeaderRef = useRef<HTMLDivElement>(null);

  // Calculate bottom sheet minimum snap point at page load
  useEffect(() => {
    // Use delay to wait until ref elements are rendered
    const timer = setTimeout(() => {
      if (
        attachRef.current &&
        sheetHeaderRef.current &&
        searchHeaderRef.current
      ) {
        // Get navbar height
        const screenHeight = window.innerHeight;
        const attachHeight = attachRef.current.offsetHeight; // Height of the component the modal sheet is attached to
        const navbarHeight = screenHeight - attachHeight;

        // Get sheet header & search header height
        const sheetHeaderHeight = sheetHeaderRef.current.offsetHeight;
        const searchHeaderHeight = searchHeaderRef.current.offsetHeight;

        // Calculate bottom snap position
        const topSnap = (screenHeight - 28) / screenHeight;
        const bottomSnap =
          (sheetHeaderHeight + searchHeaderHeight + navbarHeight) /
          screenHeight;

        setSnapPoints((prev) => [topSnap, prev[1], bottomSnap]);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return { snapPoints, attachRef, sheetHeaderRef, searchHeaderRef };
};

export default useBottomSheetSnapPoints;
