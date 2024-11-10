import { forwardRef } from "react";
import { Marker, MarkerProps } from "react-naver-maps";

const UserPositionMarker = forwardRef<naver.maps.Marker, MarkerProps>(
  ({ ...rest }, ref) => {
    const userWidth = 38;
    const userHeight = 38;

    const icon = {
      url: "icons/userPositionMarker.png",
      size: new naver.maps.Size(userWidth, userHeight),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(userWidth / 2, userHeight / 2),
    };

    return <Marker icon={icon} ref={ref} {...rest} />;
  }
);

export default UserPositionMarker;
