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
import useToastPopup from "@/utils/toastPopup";
import { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import {
  Container as MapDiv,
  NaverMap,
  NavermapsProvider,
  useNavermaps,
} from "react-naver-maps";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [category, setCategory] = useState<placeCategory>("CAFE");
  const [sort, setSort] = useState<placeSort>("NEAR");
  const [places, setPlaces] = useState<GetPlaceResponse[]>();
  const [dataQuery, setDataQuery] = useState<string>("");

  const { handleMapMove } = useUpdatePlaces({
    query: dataQuery,
    category,
    sort,
    setPlaces,
  });

  // Geolocation and map setup
  const naverMaps = useNavermaps();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [user, setUser] = useState<naver.maps.Marker | null>(null);
  const [activePinIndex, setActivePinIndex] = useState<number | null>(null);
  const [followUser, setFollowUser] = useState(true);
  const defaultZoom = 20;

  // URL params
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const hasParams = !!search;
  const query = params.get("query");
  const longitude = params.get("longitude");
  const latitude = params.get("latitude");
  if (hasParams && query && longitude && latitude) {
    map?.setCenter(
      new naverMaps.LatLng(
        Number.parseFloat(latitude) - 0.0001, // Offset for bottom sheet
        Number.parseFloat(longitude)
      )
    );
  }
  useMapSetup(!hasParams, map, user, followUser, setActivePinIndex);

  // Bottom sheet logic
  const sheetRef = useRef<SheetRef>();
  const { snapPoints, attachRef, sheetHeaderRef } = useBottomSheetSnapPoints();
  const [left, setLeft] = useState(0);
  const updateLeftPosition = () => {
    const newLeft = window.innerWidth > 440 ? (window.innerWidth - 440) / 2 : 0;
    setLeft(newLeft);
  };

  // Header State
  const [isReviewView, setIsReviewView] = useState(false);

  useEffect(() => {
    // Update bottom sheet alignment on window resize
    updateLeftPosition();
    window.addEventListener("resize", updateLeftPosition);

    return () => {
      window.removeEventListener("resize", updateLeftPosition);
    };
  }, [navigate, toast]);

  return (
    <StDiv ref={attachRef}>
      <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_MAPS}>
        <StMapDiv>
          <NaverMap
            zoom={defaultZoom}
            ref={setMap}
            onBoundsChanged={() =>
              handleMapMove(map?.getBounds(), user?.getPosition())
            }
          >
            <UserPositionMarker ref={(marker) => marker && setUser(marker)} />
            {places &&
              places.map((item, index) => (
                <PinMarker
                  key={index}
                  active={activePinIndex === index}
                  type={item.placeCategory}
                  name={item.name}
                  image={item.reviewImageUrls[0]}
                  count={item.reviewCount.toString()}
                  onClick={() => {
                    setActivePinIndex(index);
                    setIsReviewView(true);
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
                  <ReviewHeader onBack={() => setIsReviewView(false)} />
                )}
              </Sheet.Header>
              <Sheet.Content style={{ paddingBottom: sheetRef.current?.y }}>
                <Sheet.Scroller>
                  {(!places || places.length === 0) && (
                    <div className="no-reviews">
                      <p>근처에 리뷰 있는</p>
                      <p>가게가 없어요!</p>
                    </div>
                  )}
                  {places &&
                    !isReviewView &&
                    // activePinIndex === null &&
                    places.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setIsReviewView(true);
                          navigate(
                            `${window.location.pathname}?placeId=${item.kakaoPlaceId}`
                          );
                        }}
                      >
                        <Restaurant
                          key={item.placeId}
                          placeId={item.placeId}
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
                    <>
                      <Review />
                    </>
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
