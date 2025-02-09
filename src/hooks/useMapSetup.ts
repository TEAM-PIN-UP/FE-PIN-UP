import useToastPopup from "@/utils/toastPopup";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavermaps } from "react-naver-maps";

const useMapSetup = (
  useGeolocation: boolean,
  map: naver.maps.Map | null,
  user: naver.maps.Marker | null,
  setActivePinIndex: React.Dispatch<React.SetStateAction<number | null>>
) => {
  const naverMaps = useNavermaps();
  const isDragging = useRef(false);
  const toast = useToastPopup();
  const [userPosition, setUserPosition] = useState<naver.maps.LatLng | null>(
    null
  );

  const onGeolocationSuccess = useCallback(
    (position: GeolocationPosition) => {
      if (!map || !user) return;

      const location = new naverMaps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      map.setCenter(location);
      setUserPosition(location);
    },
    [map, user, naverMaps]
  );

  const onGeolocationError = useCallback(() => {
    if (!map || !user) return;
    toast("위치정보를 확인하지 못했어요.");
  }, [map, user, toast]);

  // Effect to watch position updates
  useEffect(() => {
    if (!map || !user) return;

    let watcherId: number | null = null;

    if (useGeolocation && navigator.geolocation) {
      watcherId = navigator.geolocation.watchPosition(
        onGeolocationSuccess,
        onGeolocationError,
        { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
      );
    }

    return () => {
      if (watcherId !== null) navigator.geolocation.clearWatch(watcherId);
    };
  }, [useGeolocation, map, onGeolocationSuccess, onGeolocationError, user]);

  // Effect to update user marker when position changes
  useEffect(() => {
    if (user && userPosition) user.setPosition(userPosition);
  }, [user, userPosition]);

  // Detect drag vs click
  useEffect(() => {
    if (!map) return;

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
  }, [map, setActivePinIndex]);
};

export default useMapSetup;
