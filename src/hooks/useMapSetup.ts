import useToastPopup from "@/utils/toastPopup";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavermaps } from "react-naver-maps";

const useMapSetup = (
  useGeolocation: boolean,
  map: naver.maps.Map | null,
  user: naver.maps.Marker | null,
  followUser: boolean,
  setActivePinIndex: React.Dispatch<React.SetStateAction<string | null>>,
  setIsGeoAvailable: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const naverMaps = useNavermaps();
  const isDragging = useRef(false);
  const toast = useToastPopup();
  const [, setErrorCount] = useState(0);

  const onGeolocationSuccess = useCallback(
    (position: GeolocationPosition) => {
      localStorage.setItem("lastKnownPosition", JSON.stringify(position));

      if (!map || !user || !position || !position.coords) return;

      const location = new naverMaps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );

      if (followUser) map.setCenter(location);
      user.setPosition(location);
      setErrorCount(0);
      setIsGeoAvailable(true);
    },
    [map, user, naverMaps.LatLng, followUser, setIsGeoAvailable]
  );

  const onGeolocationError = useCallback(() => {
    setErrorCount((prev) => {
      if (prev > 8) {
        setIsGeoAvailable(false);
        toast("위치정보를 확인하지 못했어요.");
        return 0;
      }
      return prev + 1;
    });
  }, [setIsGeoAvailable, toast]);

  // Get & watch user position
  useEffect(() => {
    if (!map) return;
    if (useGeolocation && navigator.geolocation) {
      const watcherId = navigator.geolocation.watchPosition(
        onGeolocationSuccess,
        onGeolocationError,
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
      return () => {
        navigator.geolocation.clearWatch(watcherId);
      };
    }
  }, [map, onGeolocationError, onGeolocationSuccess, useGeolocation, user]);

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
