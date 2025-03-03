import useGetPlaces from "@/hooks/api/useGetPlaces";
import {
  GetPlaceResponse,
  placeCategory,
  placeSort,
} from "@/interface/apiInterface";
import { useEffect, useState } from "react";

interface MapBounds {
  bounds: naver.maps.Bounds | undefined;
  position: GeolocationPosition | null;
}

interface UseUpdatePlacesProps {
  query?: string;
  category: placeCategory;
  sort: placeSort;
  setPlaces: React.Dispatch<
    React.SetStateAction<GetPlaceResponse[] | undefined>
  >;
}

const useUpdatePlaces = ({
  query,
  category,
  sort,
  setPlaces,
}: UseUpdatePlacesProps) => {
  const [mapBounds, setMapBounds] = useState<MapBounds>({
    bounds: undefined,
    position: null,
  });

  const { data: placesData, isError } = useGetPlaces({
    query,
    category,
    sort,
    swLatitude: mapBounds.bounds?.getMin().y.toString() ?? "",
    swLongitude: mapBounds.bounds?.getMin().x.toString() ?? "",
    neLatitude: mapBounds.bounds?.getMax().y.toString() ?? "",
    neLongitude: mapBounds.bounds?.getMax().x.toString() ?? "",
    currentLatitude: mapBounds.position?.coords.latitude.toString() ?? "",
    currentLongitude: mapBounds.position?.coords.longitude.toString() ?? "",
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
    position: GeolocationPosition | null
  ) => {
    if (!bounds || !position) return;
    setMapBounds({ bounds, position });
  };

  return { handleMapMove };
};

export default useUpdatePlaces;
