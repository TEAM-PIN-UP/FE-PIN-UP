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
              image="pin_exampleimg.jpg"
              count="3"
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
              <Sheet.Content>
                {DummyData.map((item, index) => (
                  <Restaurant
                    key={index}
                    name={item.name}
                    averageRating={item.averageRating}
                    defaultImgUrl={item.defaultImgUrl}
                  />
                ))}
              </Sheet.Content>
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
