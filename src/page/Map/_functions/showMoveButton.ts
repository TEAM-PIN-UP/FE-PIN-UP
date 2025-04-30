import { getLastKnownPositionObj } from "@/utils/getFromLocalStorage";

const showMoveButton = (map: naver.maps.Map | null): boolean => {
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

export default showMoveButton;
