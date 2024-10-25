import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
import PinMarker from "./_components/PinMarker";
import Restaurant, { RestaurantProps } from "./_components/Restaurant";
import SearchHeader from "./_components/SearchHeader";
import UserPositionMarker from "./_components/UserPositionMarker";
import Review from "./_components/review/Review";

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
  // Geolocation and map setup
  const naverMaps = useNavermaps();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [user, setUser] = useState<naver.maps.Marker | null>(null);
  const [activePinIndex, setActivePinIndex] = useState<number | null>(null);
  const defaultCenter = new naverMaps.LatLng(37.6077842, 127.0270642);
  const defaultZoom = 18;
  useMapSetup(map, user, defaultZoom, setActivePinIndex);

  // Bottom sheet logic
  const { snapPoints, attachRef, sheetHeaderRef, searchHeaderRef } =
    useBottomSheetSnapPoints();
  const [left, setLeft] = useState(0);
  const updateLeftPosition = () => {
    const newLeft = window.innerWidth > 440 ? (window.innerWidth - 440) / 2 : 0;
    setLeft(newLeft);
  };

  // Fetch data
  const { data, error, isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: fetchPlaces,
  });

  useEffect(() => {
    // Update bottom sheet alignment on window resize
    updateLeftPosition();
    window.addEventListener("resize", updateLeftPosition);

    return () => {
      window.removeEventListener("resize", updateLeftPosition);
    };
  }, [map]);

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
                <PinMarker
                  key={index}
                  active={activePinIndex === index}
                  type="cafe"
                  name={item.name}
                  image={item.defaultImgUrl}
                  count={Math.floor(Math.random() * 5 + 1).toString()}
                  onClick={() => {
                    setActivePinIndex(index);
                    console.log(index);
                  }}
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
            left={left}
          >
            <Sheet.Container>
              <Sheet.Header ref={sheetHeaderRef} />
              <SearchHeader ref={searchHeaderRef} />
              <StSheetContent disableDrag={true}>
                {isLoading && <span>Loading...</span>}
                {error && <span>Error</span>}
                {data &&
                  activePinIndex === null &&
                  data.map((item, index) => (
                    <Restaurant
                      key={index}
                      name={item.name}
                      averageRating={item.averageRating}
                      defaultImgUrl={item.defaultImgUrl}
                    />
                  ))}
                {activePinIndex !== null && <Review />}
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

const StSheet = styled(Sheet)<{ left: number }>`
  display: flex;
  justify-content: center;
  max-width: 440px;
  min-width: 320px;
  left: ${({ left }) => `${left}px !important`};
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
