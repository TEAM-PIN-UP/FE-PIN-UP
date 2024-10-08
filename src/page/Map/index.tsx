import { useEffect, useRef, useState } from "react";
import { Sheet } from "react-modal-sheet";
import {
  Container as MapDiv,
  Marker,
  NaverMap,
  NavermapsProvider,
  useNavermaps,
} from "react-naver-maps";
import styled from "styled-components";
import SearchHeader from "./_components/SearchHeader";

const MapPage: React.FC = () => {
  const naverMaps = useNavermaps();

  const [snapPoints, setSnapPoints] = useState([0.9, 0.5, 0.2]);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const searchHeaderRef = useRef<HTMLDivElement | null>(null);

  // Calculate bottom sheet minimum snap point at page load
  useEffect(() => {
    // Use delay to wait until ref elements are rendered
    const timer = setTimeout(() => {
      if (headerRef.current && searchHeaderRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        const searchHeaderHeight = searchHeaderRef.current.offsetHeight;

        const snapPointValue =
          (headerHeight + searchHeaderHeight) / window.innerHeight;

        setSnapPoints([1, 0.5, snapPointValue]);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_MAPS}>
      <StMapDiv>
        <NaverMap defaultCenter={new naverMaps.LatLng(35.166, 126.908)}>
          <Marker defaultPosition={new naverMaps.LatLng(35.166, 126.908)} />
        </NaverMap>

        <Sheet
          isOpen={true}
          onClose={() => {}}
          snapPoints={snapPoints}
          initialSnap={1}
        >
          <Sheet.Container>
            <Sheet.Header ref={headerRef} />
            <SearchHeader ref={searchHeaderRef} />
            <Sheet.Content></Sheet.Content>
          </Sheet.Container>
        </Sheet>
      </StMapDiv>
    </NavermapsProvider>
  );
};

const StMapDiv = styled(MapDiv)`
  width: 100vw;
  height: 100vh;
`;

export default MapPage;
