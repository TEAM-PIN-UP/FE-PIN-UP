import { useState } from "react";
import { Sheet } from "react-modal-sheet";
import {
  Container as MapDiv,
  NaverMap,
  NavermapsProvider,
  useNavermaps,
} from "react-naver-maps";
import styled from "styled-components";

import useBottomSheetSnapPoints from "@/hooks/useBottomSheetSnapPoints";
import useMapSetup from "@/hooks/useMapSetup";
import InactivePinMarker from "@/page/Map/_components/InactivePinMarker";
import ActivePinMarker from "./_components/ActivePinMarker";
import SearchHeader from "./_components/SearchHeader";
import UserPositionMarker from "./_components/UserPositionMarker";

const MapPage: React.FC = () => {
  const naverMaps = useNavermaps();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [user, setUser] = useState<naver.maps.Marker | null>(null);
  const [pin, setPin] = useState<naver.maps.Marker | null>(null);
  const [pin2, setPin2] = useState<naver.maps.Marker | null>(null);
  const [pin3, setPin3] = useState<naver.maps.Marker | null>(null);
  const defaultCenter = new naverMaps.LatLng(35.1658, 126.9078);
  const defaultZoom = 18;

  // Initialize geolocation and map setup
  useMapSetup(map, user, pin, pin2, pin3, defaultZoom);

  // Bottom sheet logic
  const { snapPoints, attachRef, sheetHeaderRef, searchHeaderRef } =
    useBottomSheetSnapPoints();

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
            <ActivePinMarker
              image="https://picsum.photos/200"
              count="3"
              name="딤딤섬123"
              ref={setPin}
            />
            <InactivePinMarker type="cafe" name="딤딤섬123" ref={setPin2} />
            <InactivePinMarker type="food" name="딤딤섬123" ref={setPin3} />
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
              <Sheet.Content disableDrag={true}></Sheet.Content>
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
