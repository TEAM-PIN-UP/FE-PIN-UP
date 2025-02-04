import { GetPlaceParams, getSearchPlacesRequest } from "@/interface/apiInterface";
import customAxios from "./Interceptor";

const getApi = {
  //   getReview: () => customAxios.get(`/api/places/reviews`),
  getPlace: ({ category, sort, swLatitude, swLongitude, neLatitude, neLongitude, currentLatitude, currentLongitude }: GetPlaceParams) =>
    customAxios.get(
      `/api/places?category=${category}&sort=${sort}&swLatitude=${swLatitude}&swLongitude=${swLongitude}&neLatitude=${neLatitude}&neLongitude=${neLongitude}&currentLatitude=${currentLatitude}&currentLongitude=${currentLongitude}`
    ),
  getSearchPlaces: ({ keyword }: getSearchPlacesRequest) => customAxios.get(`/api/places/keyword?query=${keyword}`)
};

export default getApi;
