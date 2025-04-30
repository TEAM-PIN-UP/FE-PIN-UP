import { useToastStore } from "@/store";
import { getLastKnownPositionObj } from "@/utils/getFromLocalStorage";

interface HandleMoveToCurrentProps {
  map: naver.maps.Map | null;
  naverMaps: typeof naver.maps;
  setKakaoPlaceId: React.Dispatch<React.SetStateAction<string | null>>;
  setFollowUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const handleMoveToCurrent = ({
  map,
  naverMaps,
  setFollowUser,
  setKakaoPlaceId,
}: HandleMoveToCurrentProps) => {
  if (!map) return;

  const { textChange, pop } = useToastStore.getState();
  setKakaoPlaceId(null);
  setFollowUser(true);
  const pos = getLastKnownPositionObj();
  if (pos) {
    const zoom = map.getZoom();
    map.morph(
      new naverMaps.LatLng(
        pos.coords.latitude - 0.0005 * (map.getMaxZoom() - map.getZoom()),
        pos.coords.longitude
      ),
      zoom
    );
    setFollowUser(true);
  } else {
    textChange("현위치를 확인할 수 없어요.");
    pop(true);
  }
};

export default handleMoveToCurrent;
