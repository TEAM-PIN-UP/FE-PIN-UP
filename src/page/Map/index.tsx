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
import ActivePinMarker from "./_components/ActivePinMarker";
import InactivePinMarker from "./_components/InactivePinMarker";
import SearchHeader from "./_components/SearchHeader";
import UserPositionMarker from "./_components/UserPositionMarker";
import Restaurant from "./_components/Restaurant";

const DummyData = [
  {
    "name": "롯데캐슬클라시아",
    "defaultImgUrl": "https://search.pstatic.net/common/?type=b150&src=http://imgnews.naver.net/image/5286/2022/07/07/20220707500152_20220707111005245.jpg",
    "latitude": 1270264290,
    "longitude": 376085003,
    "averageRating": 0.0
  },
  {
    "name": "아소비 서울길음롯데캐슬클라시아2호점",
    "defaultImgUrl": "https://search.pstatic.net/common/?type=b150&src=http://imgnews.naver.net/image/5239/2019/05/20/0000195912_001_20190520085409372.jpg",
    "latitude": 1270264290,
    "longitude": 376085003,
    "averageRating": 0.0
  },
  {
    "name": "컴포즈커피 길음롯데캐슬클라시아점",
    "defaultImgUrl": "https://search.pstatic.net/common/?type=b150&src=https://ldb-phinf.pstatic.net/20220701_22/1656666283341LoiTN_JPEG/KakaoTalk_Moim_79DPRwwu4JjMCvOo9kCfZkmkuuyr2b.jpg",
    "latitude": 1270276606,
    "longitude": 376094436,
    "averageRating": 0.0
  },
  {
    "name": "롯데캐슬클라시아배드민턴장",
    "defaultImgUrl": "https://search.pstatic.net/sunny/?type=b150&src=https://image.hogangnono.com/image/nowatermark/original/review/20211104113404_havvcviGeuNYQjdAX4?s=720x180&t=outside&q=100",
    "latitude": 1270268359,
    "longitude": 376079406,
    "averageRating": 0.0
  },
  {
    "name": "크린토피아 성북롯데캐슬클라시아점",
    "defaultImgUrl": "https://search.pstatic.net/sunny/?type=b150&src=https://tr.xza.kr/imgdata/tr_xza_kr/202311/20231109062316-80762.jpg",
    "latitude": 1270274666,
    "longitude": 376095365,
    "averageRating": 0.0
  }
]

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
                {DummyData.map((item, index) => (
                  <Restaurant
                    key={index}
                    name={item.name}
                    averageRating={item.averageRating}
                    defaultImgUrl={item.defaultImgUrl}
                  />
                ))}
              </StSheetContent>
            </Sheet.Container>
          </StSheet>
        </StMapDiv>
      </NavermapsProvider>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100vw;
  height: 100%;
`;

const StMapDiv = styled(MapDiv)`
  flex-grow: 1;
  width: 100vw;
  height: 100%;
`;

const StSheet = styled(Sheet)`
  width: 100vw;
`;

const StSheetContent = styled(Sheet.Content)`
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default MapPage;
