import { forwardRef } from "react";
import { Marker, MarkerProps } from "react-naver-maps";

const UserPositionMarker = forwardRef<naver.maps.Marker, MarkerProps>(
  ({ ...rest }, ref) => {
    const pinWidth = 36;
    const pinHeight = 36;

    const icon = {
      url: "icons/userPositionMarker.png",
      size: new naver.maps.Size(pinWidth, pinHeight),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(pinWidth / 2, pinHeight / 2),
    };

    return <Marker icon={icon} ref={ref} {...rest} />;
  }
);

export default UserPositionMarker;
