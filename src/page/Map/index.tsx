import useGetSpecificPlaces from "@/hooks/api/useGetSpecificPlace";
import useBottomSheetSnapPoints from "@/hooks/useBottomSheetSnapPoints";
import useCheckLoginAndRoute from "@/hooks/useCheckLoginAndRoute";
import useMapSetup from "@/hooks/useMapSetup";
import useUpdatePlaces from "@/hooks/useUpdatePlaces";
import {
  GetPlaceResponse,
  placeCategory,
  placeSort,
} from "@/interface/apiInterface";
import { H3 } from "@/style/font";
import { getLastKnownPositionObj } from "@/utils/getFromLocalStorage";
import useToastPopup from "@/utils/toastPopup";
import { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import {
  Container as MapDiv,
  NaverMap,
  NavermapsProvider,
  useNavermaps,
} from "react-naver-maps";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ReviewHeader from "./_components/headers/ReviewHeader";
import SearchHeader from "./_components/headers/SearchHeader";
import PinMarker from "./_components/PinMarker";
import Restaurant from "./_components/Restaurant";
import Review from "./_components/review/Review";
import UserPositionMarker from "./_components/UserPositionMarker";

const MapPage: React.FC = () => {
  useCheckLoginAndRoute();

  const navigate = useNavigate();
  const toast = useToastPopup();
  const [category, setCategory] = useState<placeCategory>("ALL");
  const [sort, setSort] = useState<placeSort>("NEAR");
  const [places, setPlaces] = useState<GetPlaceResponse[]>();
  const [dataQuery, setDataQuery] = useState<string>("");
  const [searchParams] = useSearchParams();
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [isReviewView, setIsReviewView] = useState(false);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  console.log(position);

  const kakaoPlaceId = searchParams.get("kakaoPlaceId");

  useEffect(() => {
    if (kakaoPlaceId) setIsReviewView(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [kakaoPlaceId]);

  // Don't follow user on review view
  useEffect(() => {
    if (isReviewView) setFollowUser(false);
    return () => {};
  }, [isReviewView]);

  // Geolocation and map setup
  const naverMaps = useNavermaps();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [user, setUser] = useState<naver.maps.Marker | null>(null);
  const [activePinIndex, setActivePinIndex] = useState<string | null>(null);
  const [followUser, setFollowUser] = useState(true);
  const defaultZoom = 20;
  useMapSetup(true, map, user, followUser, setActivePinIndex);

  const { data: placeData } = useGetSpecificPlaces({
    kakaoPlaceId: kakaoPlaceId!,
    currentLongitude: getLastKnownPositionObj()?.coords.longitude || 0,
    currentLatitude: getLastKnownPositionObj()?.coords.latitude || 0,
    setBookmark,
  });

  useEffect(() => {
    if (!kakaoPlaceId || !placeData || !map) return;
    setIsReviewView(true);
    setActivePinIndex(kakaoPlaceId);

    const newCenter = new naverMaps.LatLng(
      placeData.mapPlaceResponse.latitude - 0.0001,
      placeData.mapPlaceResponse.longitude
    );

    map.setCenter(newCenter);
  }, [kakaoPlaceId, placeData, map, naverMaps.LatLng]);

  // Bottom sheet logic
  const sheetRef = useRef<SheetRef>();
  const { snapPoints, attachRef, sheetHeaderRef } = useBottomSheetSnapPoints();
  const [left, setLeft] = useState(0);
  const updateLeftPosition = () => {
    const newLeft = window.innerWidth > 440 ? (window.innerWidth - 440) / 2 : 0;
    setLeft(newLeft);
  };

  const removeQueries = () => {
    const path = window.location.pathname; // 현재 경로
    window.history.pushState({}, "", path); // 쿼리 없이 경로만 유지
  };

  useEffect(() => {
    updateLeftPosition();
    window.addEventListener("resize", updateLeftPosition);
    return () => {
      window.removeEventListener("resize", updateLeftPosition);
    };
  }, []);

  // Track mouse down
  const [isPointerDown, setIsPointerDown] = useState(false);
  useEffect(() => {
    const handlePointerDown = () => setIsPointerDown(true);
    const handlePointerUp = () => setIsPointerDown(false);

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchstart", handlePointerDown);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, []);

  const { handleMapMove } = useUpdatePlaces({
    query: dataQuery,
    category,
    sort,
    isPointerDown,
    setPlaces,
  });

  const handleMoveToCurrent = () => {
    setFollowUser(true);
    setActivePinIndex(null);
    const pos = getLastKnownPositionObj();
    if (pos)
      map?.setCenter(
        new naverMaps.LatLng(pos?.coords.latitude, pos?.coords.longitude)
      );
    else toast("현위치를 확인할 수 없어요.");
  };

  return (
    <StDiv ref={attachRef}>
      <button className="move-to-current" onClick={handleMoveToCurrent}>
        현위치로 이동
      </button>
      <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_MAPS}>
        <StMapDiv>
          <NaverMap
            zoom={defaultZoom}
            ref={setMap}
            onBoundsChanged={() => {
              setFollowUser(false);
              handleMapMove(map?.getBounds(), getLastKnownPositionObj());
            }}
          >
            <UserPositionMarker ref={(marker) => marker && setUser(marker)} />
            {places &&
              places.map((item) => (
                <PinMarker
                  key={item.kakaoPlaceId}
                  active={activePinIndex === item.kakaoPlaceId}
                  type={item.placeCategory}
                  name={item.name}
                  image={item.reviewImageUrls[0]}
                  count={item.reviewCount.toString()}
                  onClick={() => {
                    setActivePinIndex(item.kakaoPlaceId);
                    setIsReviewView(true);
                    navigate(
                      `${window.location.pathname}?kakaoPlaceId=${item.kakaoPlaceId}`
                    );
                  }}
                  position={
                    new naverMaps.LatLng({
                      lat: item.latitude,
                      lng: item.longitude,
                    })
                  }
                />
              ))}
          </NaverMap>
          <StSheet
            ref={sheetRef}
            isOpen={true}
            onClose={() => {}}
            snapPoints={snapPoints}
            initialSnap={1}
            mountPoint={attachRef.current!}
            $left={left}
          >
            <Sheet.Container>
              <Sheet.Header ref={sheetHeaderRef}>
                <Sheet.Header />
                {!isReviewView && (
                  <SearchHeader
                    dataQuery={dataQuery}
                    setDataQuery={setDataQuery}
                    setSort={setSort}
                    category={category}
                    setCategory={setCategory}
                  />
                )}
                {isReviewView && (
                  <ReviewHeader
                    bookmark={bookmark}
                    setBookmark={setBookmark}
                    onBack={() => {
                      removeQueries();
                      setIsReviewView(false);
                      setActivePinIndex(null);
                    }}
                  />
                )}
              </Sheet.Header>
              <Sheet.Content style={{ paddingBottom: sheetRef.current?.y }}>
                <Sheet.Scroller>
                  {((!isReviewView && !places) ||
                    (!isReviewView && places?.length === 0)) && (
                    <div className="no-reviews">
                      <p>근처에 리뷰 있는</p>
                      <p>가게가 없어요!</p>
                    </div>
                  )}
                  {places &&
                    !isReviewView &&
                    // activePinIndex === null &&
                    places.map((item) => (
                      <div
                        key={item.kakaoPlaceId}
                        onClick={() => {
                          setIsReviewView(true);
                          setActivePinIndex(item.kakaoPlaceId);
                          navigate(
                            `${window.location.pathname}?kakaoPlaceId=${item.kakaoPlaceId}`
                          );
                        }}
                      >
                        <Restaurant
                          key={item.kakaoPlaceId}
                          // placeId={item.placeId}
                          name={item.name}
                          averageStarRating={item.averageStarRating}
                          reviewImageUrls={item.reviewImageUrls}
                          reviewerProfileImageUrls={
                            item.reviewerProfileImageUrls
                          }
                          reviewCount={item.reviewCount}
                          distance={item.distance}
                        />
                      </div>
                    ))}
                  {isReviewView && (
                    // || activePinIndex !== null
                    <Review
                      setBookmark={setBookmark}
                      currentLatitude={
                        getLastKnownPositionObj()?.coords.latitude
                      }
                      currentLongitude={
                        getLastKnownPositionObj()?.coords.longitude
                      }
                    />
                  )}
                </Sheet.Scroller>
              </Sheet.Content>
              <StGap
                $attachHeight={
                  attachRef.current?.offsetHeight ?? window.innerHeight - 65
                }
              />
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

  .move-to-current {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
  }
`;

const StMapDiv = styled(MapDiv)`
  width: 100%;
  height: 100%;
`;

const StSheet = styled(Sheet)<{ $left: number }>`
  display: flex;
  justify-content: center;
  max-width: 440px;
  min-width: 320px;
  left: ${({ $left }) => `${$left}px !important`};

  .react-modal-sheet-content::-webkit-scrollbar {
    width: 8px;
  }

  .react-modal-sheet-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  .react-modal-sheet-content::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  .react-modal-sheet-content::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .no-reviews {
    ${H3}
    display:flex;
    flex-direction: column;
    color: var(--neutral_500);
    gap: var(--spacing_8);
    margin-top: var(--spacing_12);
  }
`;

const StGap = styled.div<{ $attachHeight: number }>`
  height: ${({ $attachHeight }) => `${window.innerHeight - $attachHeight}px`};
`;

export default MapPage;
