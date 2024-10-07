import { Sheet } from "react-modal-sheet";
import {
  Container as MapDiv,
  Marker,
  NaverMap,
  NavermapsProvider,
  useNavermaps,
} from "react-naver-maps";
import styled from "styled-components";

const MapPage: React.FC = () => {
  const naverMaps = useNavermaps();

  return (
    <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_MAPS}>
      <StMapDiv>
        <NaverMap defaultCenter={new naverMaps.LatLng(35.166, 126.908)}>
          <Marker defaultPosition={new naverMaps.LatLng(35.166, 126.908)} />
        </NaverMap>

        <Sheet
          isOpen={true}
          onClose={() => {}}
          snapPoints={[0.9, 0.5, 0.1]}
          initialSnap={1}
        >
          <Sheet.Container>
            <Sheet.Header />
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
