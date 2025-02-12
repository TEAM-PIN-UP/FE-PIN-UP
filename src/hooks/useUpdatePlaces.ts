import useGetPlaces from "@/hooks/api/useGetPlaces";
import {
  GetPlaceResponse,
  placeCategory,
  placeSort,
} from "@/interface/apiInterface";
import { useEffect, useState } from "react";

interface MapBounds {
  bounds: naver.maps.Bounds | undefined;
  position: naver.maps.Coord | undefined;
}

interface UseUpdatePlacesProps {
  query?: string;
  category: placeCategory;
  sort: placeSort;
  isPointerDown: boolean;
  setPlaces: React.Dispatch<
    React.SetStateAction<GetPlaceResponse[] | undefined>
  >;
}

const useUpdatePlaces = ({
  query,
  category,
  sort,
  isPointerDown,
  setPlaces,
}: UseUpdatePlacesProps) => {
  const [mapBounds, setMapBounds] = useState<MapBounds>({
    bounds: undefined,
    position: undefined,
  });

  const { data: placesData, isError } = useGetPlaces({
    query,
    category,
    sort,
    swLatitude: mapBounds.bounds?.getMin().y.toString() ?? "",
    swLongitude: mapBounds.bounds?.getMin().x.toString() ?? "",
    neLatitude: mapBounds.bounds?.getMax().y.toString() ?? "",
    neLongitude: mapBounds.bounds?.getMax().x.toString() ?? "",
    currentLatitude: mapBounds.position?.y.toString() ?? "",
    currentLongitude: mapBounds.position?.x.toString() ?? "",
  });

  useEffect(() => {
    if (isError) {
      console.error("Failed to fetch places");
      return;
    }

    if (placesData) {
      setPlaces(placesData);
    }
  }, [placesData, isError, setPlaces]);

  const handleMapMove = (
    bounds: naver.maps.Bounds | undefined,
    position: naver.maps.Coord | undefined
  ) => {
    if (!bounds || !position || isPointerDown) return;
    setMapBounds({ bounds, position });
  };

  return { handleMapMove };
};

export default useUpdatePlaces;
