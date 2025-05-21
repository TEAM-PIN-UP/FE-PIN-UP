import getApi from "@/api/getApi";
import { GetPinBuddySearchResponse } from "@/interfaces/member";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

interface UseFriendSearchProps {
  setSearchList: React.Dispatch<React.SetStateAction<boolean>>;
  nickname: string;
}

const useFriendSearch = ({
  nickname,
  setSearchList,
}: UseFriendSearchProps): UseQueryResult<GetPinBuddySearchResponse[]> => {
  const queryFn = async () => {
    const response = await getApi.getSearchMember(nickname);
    setSearchList(response.data);
    return response.data;
  };
  return useQuery({
    queryFn,
    enabled: !!nickname,
    queryKey: queryKeys.searchMember(nickname),
  });
};

export default useFriendSearch;
