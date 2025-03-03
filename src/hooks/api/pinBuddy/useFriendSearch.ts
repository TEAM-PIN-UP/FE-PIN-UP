import getApi from "@/api/getApi";
import { GetPinBuddySearchResponse } from "@/interface/apiInterface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface UseFriendSearchProps {
  setSearchList: React.Dispatch<React.SetStateAction<boolean>>;
  nickname: string;
}

const useFriendSearch = ({
  nickname,
  setSearchList,
}: UseFriendSearchProps): UseQueryResult<GetPinBuddySearchResponse[]> => {
  const queryFn = async () => {
    const response = await getApi.getSearchMember({ nickname });
    setSearchList(response.data);
    return response.data;
  };
  return useQuery({ queryFn, queryKey: ["searchPinbuddy", nickname] });
};

export default useFriendSearch;
