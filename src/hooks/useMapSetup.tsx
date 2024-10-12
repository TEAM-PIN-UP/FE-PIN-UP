import { useCallback, useEffect } from "react";
import { useNavermaps } from "react-naver-maps";

const useMapSetup = (
  map: naver.maps.Map | null,
  user: naver.maps.Marker | null,
  pin: naver.maps.Marker | null,
  pin2: naver.maps.Marker | null,
  pin3: naver.maps.Marker | null,
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
      const exampleLocation = new naverMaps.LatLng(
        position.coords.latitude + 0.0005,
        position.coords.longitude + 0.0005
      );
      const exampleLocation2 = new naverMaps.LatLng(
        position.coords.latitude + 0.0005,
        position.coords.longitude
      );
      const exampleLocation3 = new naverMaps.LatLng(
        position.coords.latitude + 0.0005,
        position.coords.longitude - 0.0005
      );
      map.setCenter(location);
      map.setZoom(defaultZoom);
      user.setPosition(location);
      pin?.setPosition(exampleLocation);
      pin2?.setPosition(exampleLocation2);
      pin3?.setPosition(exampleLocation3);
      console.log("Coordinates: " + location.toString());
    },
    [map, user, pin, pin2, pin3, naverMaps, defaultZoom]
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
