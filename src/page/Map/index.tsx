import useBottomSheetSnapPoints from "@/hooks/useBottomSheetSnapPoints";
import useMapSetup from "@/hooks/useMapSetup";
import { PlaceParams, PlaceResponse } from "@/interface/place";
import { H3 } from "@/style/font";
import axios from "axios";
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
import Review from "../Review";
import ReviewHeader from "./_components/headers/ReviewHeader";
import SearchHeader from "./_components/headers/SearchHeader";
import PinMarker from "./_components/PinMarker";
import Restaurant from "./_components/Restaurant";
import UserPositionMarker from "./_components/UserPositionMarker";

const MapPage: React.FC = () => {
  const navigate = useNavigate();

  // Geolocation and map setup
  const naverMaps = useNavermaps();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [user, setUser] = useState<naver.maps.Marker | null>(null);
  const [activePinIndex, setActivePinIndex] = useState<number | null>(null);
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
  useMapSetup(!hasParams, map, user, defaultZoom, setActivePinIndex);

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

  // Places list
  const [places, setPlaces] = useState<PlaceResponse[]>();

  const handleMapMove = async (
    bounds: naver.maps.Bounds | undefined,
    position: naver.maps.Coord | undefined
  ) => {
    try {
      if (!bounds || !position) return;

      const swLatitude = bounds.getMin().y.toString();
      const swLongitude = bounds.getMin().x.toString();
      const neLatitude = bounds.getMax().y.toString();
      const neLongitude = bounds.getMax().x.toString();
      const currentLatitude = position.y.toString();
      const currentLongitude = position.x.toString();

      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/places`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            category: "카페",
            sort: "가까운 순",
            swLatitude,
            swLongitude,
            neLatitude,
            neLongitude,
            currentLatitude,
            currentLongitude,
          } as PlaceParams,
        }
      );

      setPlaces(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Check signin
    if (!localStorage.getItem("accessToken")) navigate("/signup");

    // Update bottom sheet alignment on window resize
    updateLeftPosition();
    window.addEventListener("resize", updateLeftPosition);

    return () => {
      window.removeEventListener("resize", updateLeftPosition);
    };
  }, [navigate]);

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
            <UserPositionMarker ref={setUser} />
            {places &&
              places.map((item, index) => (
                <PinMarker
                  key={index}
                  active={activePinIndex === index}
                  type={item.placeCategory}
                  name={item.name}
                  image={`https://picsum.photos/200`}
                  count={item.reviewCount.toString()}
                  onClick={() => {
                    setActivePinIndex(index);
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
                  <SearchHeader places={places} setPlaces={setPlaces} />
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
                    activePinIndex === null &&
                    places.map((item, index) => (
                      <div key={index} onClick={() => setIsReviewView(true)}>
                        <Restaurant
                          key={index}
                          name={item.name}
                          averageRating={item.averageStarRating}
                          defaultImgUrl={`https://picsum.photos/200`}
                        />
                      </div>
                    ))}
                  {(isReviewView || activePinIndex !== null) && (
                    <>
                      <Restaurant
                        name={places?.[activePinIndex ?? 0].name ?? ""}
                        averageRating={
                          places?.[activePinIndex ?? 0].averageStarRating ?? 0
                        }
                        defaultImgUrl={
                          // places?.[activePinIndex ?? 0].reviewImageUrls[0] ?? ""
                          `https://picsum.photos/200`
                        }
                      />
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
