import { forwardRef } from "react";
import { Marker, MarkerProps } from "react-naver-maps";

interface PinMarkerProps extends MarkerProps {
  image?: string;
  count?: string;
}

const PinMarker = forwardRef<naver.maps.Marker, PinMarkerProps>(
  ({ image, count, ...rest }, ref) => {
    const pinWidth = 36;
    const pinHeight = 44;
    const pinImage = "/icons/pinMarker.png";
    const circleRadius = 28;
    const circleTopOffset = 13;

    const htmlContent = `
    <div style="position: relative; width: ${pinWidth}px; height: ${pinHeight}px;">
      <!-- Base pin -->
      <img src="${pinImage}" style="width: 100%; height: 100%;" alt="" />
      
      <!-- Profile image -->
      <div style="
        position: absolute;
        left: 50%;
        top: ${circleTopOffset}%;
        transform: translate(-50%, -${circleTopOffset}%);
        width: ${circleRadius}px;
        height: ${circleRadius}px;
        border: 2px solid white;
        border-radius: 50%;
        overflow: hidden;
      ">
        <!-- Dark overlay -->
        <div style="
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 1;
        "></div>

        <img src="${image}" style="width: 100%; height: 100%; object-fit: cover;" alt="" />

        <!-- Count -->
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: 120%;
          letter-spacing: -0.24px;
          z-index: 1;
        ">
          ${count ?? ""}
        </div>
      </div>
    </div>
  `;

    const icon = {
      content: htmlContent,
      size: new naver.maps.Size(pinWidth, pinHeight),
      anchor: new naver.maps.Point(pinWidth / 2, pinHeight),
    };

    return (
      <>
        <Marker icon={icon} ref={ref} {...rest} />
      </>
    );
  }
);

export default PinMarker;