import { forwardRef } from "react";
import { Marker, MarkerProps } from "react-naver-maps";

import RoundCafe from "@/image/icons/roundCafe.svg";
import RoundFood from "@/image/icons/roundFood.svg";

interface InactivePinMarkerProps extends MarkerProps {
  type: "cafe" | "food";
  name: string;
}

const InactivePinMarker = forwardRef<naver.maps.Marker, InactivePinMarkerProps>(
  ({ type, name, ...rest }, ref) => {
    const pinWidth = 28;
    const pinHeight = 28;
    const totalWidth = 48;
    const totalHeight = pinHeight + 25;
    const roundIcon = type === "cafe" ? RoundCafe : RoundFood;

    const htmlContent = `
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

      <!-- Pin name -->
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
        width: ${totalWidth}px;
        white-space: nowrap;
      ">
        ${name.length > 3 ? `${name.slice(0, 3)}..` : name}
      </div>
    </div>
  `;

    const icon = {
      content: htmlContent,
      size: new naver.maps.Size(totalWidth, totalHeight),
      // Anchor should be set to center of circle icon
      anchor: new naver.maps.Point(totalWidth / 2, pinHeight / 2),
    };

    return <Marker icon={icon} ref={ref} {...rest} />;
  }
);

export default InactivePinMarker;
