import { forwardRef } from "react";
import { Marker, MarkerProps } from "react-naver-maps";

import Pin from "@/image/icons/pinSelected.svg";

interface ActivePinMarkerProps extends MarkerProps {
  image?: string;
  count?: string;
  name: string;
}

const ActivePinMarker = forwardRef<naver.maps.Marker, ActivePinMarkerProps>(
  ({ image, count, name, ...rest }, ref) => {
    const pinWidth = 36;
    const pinHeight = 44;
    const circleRadius = 28;
    const circleTopOffset = 13;

    const htmlContent = `
    <div style="
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    ">
      <div style="
        align-items: center;
        position: relative;
        height: ${pinHeight}px;
        justify-content: center;
        width: ${pinWidth}px;
      ">
        <!-- Base pin -->
        <img src="${Pin}" style="width: 100%; height: 100%;" alt="" />
        
        <!-- Profile image -->
        <div style="
          border: 2px solid white;
          border-radius: 50%;
          height: ${circleRadius}px;
          left: 50%;
          overflow: hidden;
          position: absolute;
          top: ${circleTopOffset}%;
          transform: translate(-50%, -${circleTopOffset}%);
          width: ${circleRadius}px;
        ">
          <!-- Dark overlay -->
          <div style="
            background-color: rgba(0, 0, 0, 0.4);
            height: 100%;
            position: absolute;
            width: 100%;
            z-index: 1;
          "></div>

          <img src="${image}" style="width: 100%; height: 100%; object-fit: cover;" alt="" />

          <!-- Count -->
          <div style="
            align-items: center;
            border-radius: 50%;
            color: white;
            display: flex;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            height: 16px;
            justify-content: center;
            left: 50%;
            letter-spacing: -0.24px;
            line-height: 120%;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 16px;
            z-index: 1;
          ">
            ${count ?? ""}
          </div>
        </div>
      </div>

      <!-- Pin name -->
      <div style="
        align-items: center;
        background-color: #222;
        border-radius: 99px;
        color: white;
        display: flex;
        font-size: 12px;
        font-weight: 600;
        justify-content: center;
        margin-top: 8px;
        overflow: hidden;
        padding: 2.5px 7.5px;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 48px;
      ">
        ${name.length > 3 ? `${name.slice(0, 3)}..` : name}
      </div>
    </div>
  `;

    const icon = {
      content: htmlContent,
      size: new naver.maps.Size(pinWidth, pinHeight),
      anchor: new naver.maps.Point(pinWidth / 2, pinHeight),
    };

    return <Marker icon={icon} ref={ref} {...rest} />;
  }
);

export default ActivePinMarker;
