import { useCallback, useEffect, useRef, useState } from "react";
import { Sheet } from "react-modal-sheet";
import {
  Container as MapDiv,
  NaverMap,
  NavermapsProvider,
  useNavermaps,
} from "react-naver-maps";
import styled from "styled-components";

import PinMarker from "./_components/PinMarker";
import SearchHeader from "./_components/SearchHeader";
import UserPositionMarker from "./_components/UserPositionMarker";

const MapPage: React.FC = () => {
  // Map settings and refs
  const naverMaps = useNavermaps();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [user, setUser] = useState<naver.maps.Marker | null>(null);
  const [pin, setPin] = useState<naver.maps.Marker | null>(null);
  const defaultCenter = new naverMaps.LatLng(35.1658, 126.9078);
  const defaultZoom = 18;

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
      map.setCenter(location);
      map.setZoom(defaultZoom);
      user.setPosition(location);
      pin?.setPosition(exampleLocation);
      console.log("Coordinates: " + location.toString());
    },
    [map, user, pin, naverMaps, defaultZoom]
  );

  const onErrorGeolocation = useCallback(() => {
    if (!map || !user) return;
    console.error("Geolocation error.");
  }, [map, user]);

  useEffect(() => {
    if (!map) return;
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        onSuccessGeolocation,
        onErrorGeolocation
      );
  }, [map, onErrorGeolocation, onSuccessGeolocation]);

  // Bottom sheet settings and refs
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
        const attachHeight = attachRef.current.offsetHeight;
        const navbarHeight = screenHeight - attachHeight;

        // Get sheet header & search header height
        const sheetHeaderHeight = sheetHeaderRef.current.offsetHeight;
        const searchHeaderHeight = searchHeaderRef.current.offsetHeight;

        // Calculate bottom snap position
        const snapPointValue =
          (sheetHeaderHeight + searchHeaderHeight + navbarHeight) /
          screenHeight;

        setSnapPoints([0.9, 0.5, snapPointValue]);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StDiv ref={attachRef}>
      <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_MAPS}>
        <StMapDiv>
          <NaverMap
            defaultCenter={defaultCenter}
            zoom={defaultZoom}
            ref={setMap}
          >
            <UserPositionMarker ref={setUser} />
            <PinMarker
              image="https://picsum.photos/200"
              count="3"
              name="딤딤섬123"
              ref={setPin}
              defaultPosition={new naverMaps.LatLng(35.1665, 126.9085)}
            />
          </NaverMap>

          <Sheet
            isOpen={true}
            onClose={() => {}}
            snapPoints={snapPoints}
            initialSnap={1}
            mountPoint={attachRef.current!}
          >
            <Sheet.Container>
              <Sheet.Header ref={sheetHeaderRef} />
              <SearchHeader ref={searchHeaderRef} />
              <Sheet.Content></Sheet.Content>
            </Sheet.Container>
          </Sheet>
        </StMapDiv>
      </NavermapsProvider>
    </StDiv>
  );
};

const StDiv = styled.div`
  flex-grow: 1;
  width: 100vw;
  height: 100%;
`;

const StMapDiv = styled(MapDiv)`
  flex-grow: 1;
  width: 100vw;
  height: 100%;
`;

export default MapPage;
