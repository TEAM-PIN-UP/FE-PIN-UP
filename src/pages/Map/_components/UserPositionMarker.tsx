import { forwardRef } from "react";
import { Marker, MarkerProps } from "react-naver-maps";

interface UserPositionMarkerProps extends MarkerProps {
  enabled: boolean;
}

const UserPositionMarker = forwardRef<
  naver.maps.Marker,
  UserPositionMarkerProps
>(({ enabled, ...rest }, ref) => {
  const userWidth = 38;
  const userHeight = 38;

  const icon = {
    url: enabled ? "icons/userPositionMarker.png" : "",
    size: new naver.maps.Size(userWidth, userHeight),
    origin: new naver.maps.Point(0, 0),
    anchor: new naver.maps.Point(userWidth / 2, userHeight / 2),
  };

  return <Marker icon={icon} ref={ref} {...rest} />;
});

export default UserPositionMarker;
