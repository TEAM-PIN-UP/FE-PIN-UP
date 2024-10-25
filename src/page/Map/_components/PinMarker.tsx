import { forwardRef } from "react";
import { Marker, MarkerProps } from "react-naver-maps";

import Pin from "@/image/icons/pinSelected.svg";
import RoundCafe from "@/image/icons/roundCafe.svg";
import RoundFood from "@/image/icons/roundFood.svg";

interface PinMarkerProps extends MarkerProps {
  active: boolean;
  type: "cafe" | "food";
  name: string;
  image?: string;
  count?: string;
}

const PinMarker = forwardRef<naver.maps.Marker, PinMarkerProps>(
  ({ active, type, name, image, count, ...rest }, ref) => {
    const pinWidth = active ? 36 : 28;
    const pinHeight = active ? 44 : 28;
    const totalWidth = 48;
    const totalHeight = pinHeight + 25;

    const circleRadius = 28;
    const circleTopOffset = 13;

    const roundIcon = type === "cafe" ? RoundCafe : RoundFood;

    // Generate HTML content based on state (active/inactive)
    const htmlContent = active
      ? // Active marker
        `
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
            <img src="${Pin}" style="width: 100%; height: 100%;" alt="" />
          
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
              <div style="
                background-color: rgba(0, 0, 0, 0.4);
                height: 100%;
                position: absolute;
                width: 100%;
                z-index: 1;
              "></div>

              <img src="${image}" style="width: 100%; height: 100%; object-fit: cover;" alt="" />

              <div style="
                align-items: center;
                border-radius: 50%;
                color: white;
                display: flex;
                font-size: 16px;
                font-weight: 600;
                height: 16px;
                justify-content: center;
                left: 50%;
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

          <div style="
            align-items: center;
            background-color: #222;
            border-radius: 99px;
            color: white;
            display: flex;
            font-size: 12px;
            font-weight: 600;
            justify-content: center;
            margin-top: 22px;
            overflow: hidden;
            padding: 2.5px 7.5px;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: ${totalWidth}px;
          ">
            ${name.length > 3 ? `${name.slice(0, 3)}..` : name}
          </div>
        </div>
        `
      : // Inactive marker
        `
        <div style="
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        ">
          <div style="
            align-items: center;
            height: ${pinHeight}px;
            justify-content: center;
            position: relative;
            width: ${pinWidth}px;
          ">
            <img src="${roundIcon}" style="width: 100%; height: 100%; object-fit: cover;" alt="" />
          </div>

          <div style="
            align-items: center;
            background-color: rgba(0, 0, 0, 0.25);
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
            width: ${totalWidth}px;
          ">
            ${name.length > 3 ? `${name.slice(0, 3)}..` : name}
          </div>
        </div>
    `;

    const icon = {
      content: htmlContent,
      size: new naver.maps.Size(totalWidth, totalHeight),
      anchor: active
        ? new naver.maps.Point(totalWidth / 2, pinHeight)
        : new naver.maps.Point(totalWidth / 2, pinHeight / 2),
    };

    return <Marker icon={icon} ref={ref} {...rest} />;
  }
);

export default PinMarker;
