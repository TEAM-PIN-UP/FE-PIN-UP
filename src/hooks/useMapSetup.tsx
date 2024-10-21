import { useCallback, useEffect } from "react";
import { useNavermaps } from "react-naver-maps";

const useMapSetup = (
  map: naver.maps.Map | null,
  user: naver.maps.Marker | null,
  defaultZoom: number
) => {
  const naverMaps = useNavermaps();

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
  }, [map, onSuccessGeolocation, onErrorGeolocation]);
};

export default useMapSetup;
