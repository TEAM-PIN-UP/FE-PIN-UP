import { GetPlaceParams } from "@/interface/apiInterface";
import customAxios from "./Interceptor";

const getApi = {
  //   getReview: () => customAxios.get(`/api/places/reviews`),
  getPlace: ({ query, latitude, longitude }: GetPlaceParams) =>
    customAxios.get(
      `/api/places/search?query=${query}&longitude=${longitude}&latitude=${latitude}`
    ),
};

export default getApi;
