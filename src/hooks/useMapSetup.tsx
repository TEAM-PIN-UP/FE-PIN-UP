import { useCallback, useEffect, useRef } from "react";
import { useNavermaps } from "react-naver-maps";

const useMapSetup = (
  map: naver.maps.Map | null,
  user: naver.maps.Marker | null,
  defaultZoom: number,
  setActivePinIndex: React.Dispatch<React.SetStateAction<number | null>>
) => {
  const naverMaps = useNavermaps();
  const isDragging = useRef(false);

  const onSuccessGeolocation = useCallback(
    (position: GeolocationPosition) => {
      if (!map || !user) return;

      const location = new naverMaps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );

      map.setCenter(location);
      map.setZoom(defaultZoom);
      user.setPosition(location);
      console.log("Coordinates: " + location.toString());
    },
    [map, user, naverMaps, defaultZoom]
  );

  const onErrorGeolocation = useCallback(() => {
    if (!map || !user) return;
    console.error("Geolocation error.");
  }, [map, user]);

  useEffect(() => {
    if (!map) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onSuccessGeolocation,
        onErrorGeolocation
      );
    }

    // Detect drag vs click
    let startX = 0;
    let startY = 0;

    const handleMouseDown = (e: naver.maps.PointerEvent) => {
      isDragging.current = false;
      startX = e.offset.x;
      startY = e.offset.y;
    };

    const handleMouseMove = (e: naver.maps.PointerEvent) => {
      const dx = Math.abs(e.offset.x - startX);
      const dy = Math.abs(e.offset.y - startY);

      if (dx > 5 || dy > 5) {
        isDragging.current = true;
      }
    };

    const handleMouseUp = () => {
      if (!isDragging.current) {
        setActivePinIndex(null);
      }
    };

    const mouseDownListener = naver.maps.Event.addListener(
      map,
      "mousedown",
      handleMouseDown
    );
    const mouseMoveListener = naver.maps.Event.addListener(
      map,
      "mousemove",
      handleMouseMove
    );
    const mouseUpListener = naver.maps.Event.addListener(
      map,
      "mouseup",
      handleMouseUp
    );

    return () => {
      naver.maps.Event.removeListener(mouseDownListener);
      naver.maps.Event.removeListener(mouseMoveListener);
      naver.maps.Event.removeListener(mouseUpListener);
    };
  }, [map, onSuccessGeolocation, onErrorGeolocation, setActivePinIndex]);
};

export default useMapSetup;
