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
import { useQuery } from "@tanstack/react-query";
import Restaurant, { RestaurantProps } from "./_components/Restaurant";
import SearchHeader from "./_components/SearchHeader";
import UserPositionMarker from "./_components/UserPositionMarker";
import InactivePinMarker from "./_components/markers/InactivePinMarker";

interface PinProps extends RestaurantProps {
  latitude: number;
  longitude: number;
}

const fetchPlaces = async (): Promise<PinProps[]> => {
  const response = await fetch("http://localhost:8080/search");
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return response.json();
};

const MapPage: React.FC = () => {
  const naverMaps = useNavermaps();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [user, setUser] = useState<naver.maps.Marker | null>(null);
  const defaultCenter = new naverMaps.LatLng(37.6077842, 127.0270642);
  const defaultZoom = 18;

  // Initialize geolocation and map setup
  useMapSetup(map, user, defaultZoom);

  // Bottom sheet logic
  const { snapPoints, attachRef, sheetHeaderRef, searchHeaderRef } =
    useBottomSheetSnapPoints();

  // Fetch data
  const { data, error, isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: fetchPlaces,
  });

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
            {data &&
              data.map((item, index) => (
                <InactivePinMarker
                  key={index}
                  type="food"
                  name={item.name}
                  defaultPosition={
                    new naverMaps.LatLng(
                      item.longitude / 1e7,
                      item.latitude / 1e7
                    )
                  }
                />
              ))}
          </NaverMap>

          <StSheet
            isOpen={true}
            onClose={() => {}}
            snapPoints={snapPoints}
            initialSnap={1}
            mountPoint={attachRef.current!}
          >
            <Sheet.Container>
              <Sheet.Header ref={sheetHeaderRef} />
              <SearchHeader ref={searchHeaderRef} />
              <StSheetContent disableDrag={true}>
                {isLoading && <span>Loading...</span>}
                {error && <span>Error</span>}
                {data &&
                  data.map((item, index) => (
                    <Restaurant
                      key={index}
                      name={item.name}
                      averageRating={item.averageRating}
                      defaultImgUrl={item.defaultImgUrl}
                    />
                  ))}
              </StSheetContent>
              <StGap attach={attachRef.current?.offsetHeight ?? 85} />
            </Sheet.Container>
          </StSheet>
        </StMapDiv>
      </NavermapsProvider>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const StMapDiv = styled(MapDiv)`
  width: 100%;
  height: 100%;
`;

const StSheet = styled(Sheet)`
  display: flex;
  justify-content: center;
  max-width: 440px;
  min-width: 320px;
  left: ${window.innerWidth > 440
    ? `${(window.innerWidth - 440) / 2}px !important`
    : "0px"};
`;

const StSheetContent = styled(Sheet.Content)`
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StGap = styled.div<{ attach: number }>`
  height: ${({ attach }) => `${window.innerHeight - attach + 20}px`};
`;

export default MapPage;
