import Button from "@/components/Button";
import useGetSpecificPlaces from "@/hooks/api/place/useGetSpecificPlace";
import useUpdatePlaces from "@/hooks/api/place/useUpdatePlaces";
import useBottomSheetSnapPoints from "@/hooks/useBottomSheetSnapPoints";
import useCheckLoginAndRoute from "@/hooks/useCheckLoginAndRoute";
import useMapSetup from "@/hooks/useMapSetup";
import noReviews from "@/image/icons/receiptLines.svg";
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

  // Geolocation and map setup
  const naverMaps = useNavermaps();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [user, setUser] = useState<naver.maps.Marker | null>(null);
  const [kakaoPlaceId, setKakaoPlaceId] = useState<string | null>(
    searchParams.get("kakaoPlaceId")
  );
  const [followUser, setFollowUser] = useState(true);
  const defaultZoom = 20;
  const [isGeoAvailable, setIsGeoAvailable] = useState(false);
  useMapSetup(true, map, user, followUser, setKakaoPlaceId, setIsGeoAvailable);

  console.log(
    "id",
    kakaoPlaceId,
    "isreviewview",
    isReviewView,
    "follow",
    followUser
  );

  const { data: placeData } = useGetSpecificPlaces({
    kakaoPlaceId: kakaoPlaceId!,
    currentLongitude: getLastKnownPositionObj().coords.longitude,
    currentLatitude: getLastKnownPositionObj().coords.latitude,
    setBookmark,
  });

  const { handleMapMove } = useUpdatePlaces({
    query: dataQuery,
    category,
    sort,
    setPlaces,
  });

  useEffect(() => {
    if (!kakaoPlaceId || !placeData || !map) return;

    // Check if current center is already there
    const newCenter = new naverMaps.LatLng(
      placeData.mapPlaceResponse.latitude - 0.0001,
      placeData.mapPlaceResponse.longitude
    );

    const currentCenter = map.getCenter();
    if (
      Math.abs(currentCenter.y - newCenter.y) < 0.00001 &&
      Math.abs(currentCenter.x - newCenter.x) < 0.00001
    ) {
      return; // Avoid unnecessary updates
    }

    map.setCenter(newCenter);
    handleMapMove(map?.getBounds(), getLastKnownPositionObj());
  }, [kakaoPlaceId, placeData, map, naverMaps.LatLng, handleMapMove]);

  useEffect(() => {
    if (kakaoPlaceId) {
      setIsReviewView(true);
      setFollowUser(false);
    } else {
      setIsReviewView(false);
    }
    return () => {};
  }, [kakaoPlaceId]);

  // Bottom sheet logic
  const sheetRef = useRef<SheetRef>();
  const { snapPoints, attachRef, sheetHeaderRef } = useBottomSheetSnapPoints();
  const [left, setLeft] = useState(0);
  const updateLeftPosition = () => {
    const newLeft = window.innerWidth > 440 ? (window.innerWidth - 440) / 2 : 0;
    setLeft(newLeft);
  };
  useEffect(() => {
    updateLeftPosition();
    window.addEventListener("resize", updateLeftPosition);
    return () => {
      window.removeEventListener("resize", updateLeftPosition);
    };
  }, []);

  const removeQueries = () => {
    const path = window.location.pathname; // 현재 경로
    window.history.pushState({}, "", path); // 쿼리 없이 경로만 유지
  };

  // Track mouse down
  // Don't call places API while dragging
  // Call places API 500ms after pointer up
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handlePointerDown = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    const handlePointerUp = () => {
      timeoutRef.current = setTimeout(
        () => handleMapMove(map?.getBounds(), getLastKnownPositionObj()),
        500
      );
    };

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
  }, [handleMapMove, map]);

  const handleMoveToCurrent = () => {
    setKakaoPlaceId(null);
    setFollowUser(true);
    const pos = getLastKnownPositionObj();
    if (pos) {
      map?.morph(
        new naverMaps.LatLng(pos.coords.latitude, pos.coords.longitude),
        defaultZoom
      );
      map?.setZoom(defaultZoom);
      setFollowUser(true);
    } else toast("현위치를 확인할 수 없어요.");
  };

  const showMoveButton = (): boolean => {
    const pos = getLastKnownPositionObj();
    const center = map?.getCenter();
    if (pos && center) {
      return !(
        Math.abs(pos.coords.latitude - center.y) < 0.0005 &&
        Math.abs(pos.coords.longitude - center.x) < 0.0005
      );
    }
    return false;
  };

  return (
    <StDiv ref={attachRef}>
      <StButton
        className="move-to-current"
        onClick={handleMoveToCurrent}
        size="small"
        $enabled={isGeoAvailable && showMoveButton()}
      >
        현위치로 이동
      </StButton>
      <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_MAPS}>
        <StMapDiv>
          <NaverMap
            zoom={defaultZoom}
            ref={setMap}
            onBoundsChanged={() => setFollowUser(false)}
          >
            <UserPositionMarker
              ref={(marker) => marker && setUser(marker)}
              enabled={isGeoAvailable}
            />
            {places &&
              places.map((item) => (
                <PinMarker
                  key={item.kakaoPlaceId}
                  active={kakaoPlaceId === item.kakaoPlaceId}
                  type={item.placeCategory}
                  name={item.name}
                  image={item.reviewImageUrls[0]}
                  count={item.reviewCount.toString()}
                  onClick={() => {
                    setKakaoPlaceId(item.kakaoPlaceId);
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
                      setKakaoPlaceId(null);
                    }}
                  />
                )}
              </Sheet.Header>
              <Sheet.Content style={{ paddingBottom: sheetRef.current?.y }}>
                <Sheet.Scroller>
                  {((!isReviewView && !places) ||
                    (!isReviewView && places?.length === 0)) && (
                    <div className="no-reviews">
                      <img src={noReviews} />
                      <p>근처에 리뷰 있는</p>
                      <p>가게가 없어요!</p>
                    </div>
                  )}
                  {places &&
                    !isReviewView &&
                    places.map((item) => (
                      <div
                        key={item.kakaoPlaceId}
                        onClick={() => {
                          setKakaoPlaceId(item.kakaoPlaceId);
                          navigate(
                            `${window.location.pathname}?kakaoPlaceId=${item.kakaoPlaceId}`
                          );
                        }}
                      >
                        <Restaurant
                          key={item.kakaoPlaceId}
                          name={item.name}
                          averageStarRating={item.averageStarRating}
                          reviewImageUrls={item.reviewImageUrls
                            .slice()
                            .reverse()}
                          reviewerProfileImageUrls={item.reviewerProfileImageUrls
                            .slice()
                            .reverse()}
                          reviewCount={item.reviewCount}
                          distance={item.distance}
                        />
                      </div>
                    ))}
                  {isReviewView && (
                    <Review
                      setBookmark={setBookmark}
                      currentLatitude={
                        getLastKnownPositionObj().coords.latitude
                      }
                      currentLongitude={
                        getLastKnownPositionObj().coords.longitude
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
`;

const StButton = styled(Button)<{ $enabled: boolean }>`
  position: absolute;
  top: ${({ $enabled }) => ($enabled ? "0px" : "-40px")};
  transition: top 0.3s ease-in-out;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const StMapDiv = styled(MapDiv)`
  width: 100%;
  height: 100%;
`;

const StSheet = styled(Sheet)<{ $left: number }>`
  display: flex;
  justify-content: center;
  max-width: var(--max_width);
  min-width: var(--min_width);
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
    height:80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--neutral_500);
    gap: var(--spacing_8);
    margin-top: var(--spacing_12);

    img {
      height: 32px;
    }
  }
`;

const StGap = styled.div<{ $attachHeight: number }>`
  height: ${({ $attachHeight }) => `${window.innerHeight - $attachHeight}px`};
`;

export default MapPage;
