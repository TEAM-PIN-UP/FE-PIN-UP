import Button from "@/components/Button";
import useGetSpecificPlaces from "@/hooks/api/place/useGetSpecificPlace";
import useUpdatePlaces from "@/hooks/api/place/useUpdatePlaces";
import useBottomSheetSnapPoints from "@/hooks/useBottomSheetSnapPoints";
import useCheckLoginAndRoute from "@/hooks/useCheckLoginAndRoute";
import useMapSetup from "@/hooks/useMapSetup";
import { GetPlaceResponse, placeCategory, placeSort } from "@/interface/place";
import {
  getCurrentView,
  saveCurrentView,
} from "@/page/Map/_functions/saveCurrentView";
import { getLastKnownPositionObj } from "@/utils/getFromLocalStorage";
import useToastPopup from "@/utils/toastPopup";
import { useCallback, useEffect, useState } from "react";
import {
  Container as MapDiv,
  NaverMap,
  NavermapsProvider,
  useNavermaps,
} from "react-naver-maps";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import MapSheet from "./_components/index/MapSheet";
import PinMarker from "./_components/PinMarker";
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
  const [focusPlace, setFocusPlace] = useState(!!kakaoPlaceId);
  const defaultZoom = 12;
  const defaultCenter = (() => {
    const coords = getCurrentView();
    if (!coords) return undefined;
    return new naver.maps.LatLng(parseFloat(coords.y), parseFloat(coords.x));
  })();
  const [isGeoAvailable, setIsGeoAvailable] = useState(false);
  useMapSetup(true, map, user, followUser, setKakaoPlaceId, setIsGeoAvailable);

  const { data: placeData } = useGetSpecificPlaces({
    kakaoPlaceId: kakaoPlaceId!,
    currentLongitude: getLastKnownPositionObj().coords.longitude,
    currentLatitude: getLastKnownPositionObj().coords.latitude,
    setBookmark,
  });

  const { getPlacesInView } = useUpdatePlaces({
    query: dataQuery,
    category,
    sort,
    setPlaces,
  });
  const callbackGetPlacesInView = useCallback(() => {
    getPlacesInView(map?.getBounds(), getLastKnownPositionObj());
  }, [map, getPlacesInView]);

  // Move map to place when kakaoPlaceId is present
  useEffect(() => {
    if (!kakaoPlaceId || !placeData || !map || !focusPlace) return;

    // Check if current center is already there
    const newCenter = new naverMaps.LatLng(
      placeData.mapPlaceResponse.latitude -
        0.0005 * (map.getMaxZoom() - map.getZoom()),
      placeData.mapPlaceResponse.longitude
    );
    const currentCenter = map.getCenter();
    if (
      Math.abs(currentCenter.y - newCenter.y) < 0.001 &&
      Math.abs(currentCenter.x - newCenter.x) < 0.001
    ) {
      return; // Avoid unnecessary updates
    }
    map.setCenter(newCenter);
    callbackGetPlacesInView();
  }, [
    kakaoPlaceId,
    placeData,
    map,
    naverMaps.LatLng,
    callbackGetPlacesInView,
    focusPlace,
  ]);

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
  const { attachRef } = useBottomSheetSnapPoints();

  // Track mouse down
  // Don't call places API while dragging
  // Call places API 500ms after pointer up
  useEffect(() => {
    if (!map) return;
    let timeoutRef: NodeJS.Timeout | null = null;
    const handleIdle = () => {
      if (timeoutRef) clearTimeout(timeoutRef);
      timeoutRef = setTimeout(() => callbackGetPlacesInView(), 500);
    };
    const idleListener = naver.maps.Event.addListener(map, "idle", handleIdle);
    return () => {
      if (timeoutRef) clearTimeout(timeoutRef);
      naver.maps.Event.removeListener(idleListener);
    };
  }, [map, callbackGetPlacesInView]);

  const handleMoveToCurrent = () => {
    setKakaoPlaceId(null);
    setFollowUser(true);
    const pos = getLastKnownPositionObj();
    if (pos) {
      const zoom = map?.getZoom();
      console.log(map?.getZoom());
      console.log(map?.getMaxZoom());

      map?.morph(
        new naverMaps.LatLng(
          pos.coords.latitude - 0.0005 * (map.getMaxZoom() - map.getZoom()),
          pos.coords.longitude
        ),
        zoom
      );
      setFollowUser(true);
    } else toast("현위치를 확인할 수 없어요.");
  };

  const showMoveButton = (): boolean => {
    const pos = getLastKnownPositionObj();
    const center = map?.getCenter();
    if (pos && center) {
      return !(
        Math.abs(pos.coords.latitude - center.y) < 0.005 &&
        Math.abs(pos.coords.longitude - center.x) < 0.005
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
            defaultCenter={kakaoPlaceId ? undefined : defaultCenter}
            zoom={defaultZoom}
            ref={setMap}
            onCenterChanged={(coord) => saveCurrentView(coord)}
            onBoundsChanged={() => {
              if (followUser) setFollowUser(false);
              if (focusPlace) setFocusPlace(false);
            }}
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
                    setFocusPlace(true);
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
          <MapSheet
            {...{
              sheet: { attachRef },
              mapActions: {
                setCategory,
                setSort,
                setDataQuery,
                setBookmark,
                setKakaoPlaceId,
                setFocusPlace,
              },
              mapData: { places },
              mapState: { isReviewView, category, dataQuery, bookmark },
            }}
          />
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

export default MapPage;
