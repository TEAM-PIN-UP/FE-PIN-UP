import getApi from "@/api/getApi";
import { MemberDetails } from "@/interface/member";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

const useFriendList = ({
  id,
}: {
  id: string | number | undefined;
}): UseQueryResult<MemberDetails[]> => {
  const queryFn = async () => {
    if (id === undefined) return [];
    const response = await getApi.getFriends({ id });
    return response.data.content;
  };
  return useQuery({ queryFn, enabled: !!id, queryKey: queryKeys.friends(id!) });
};

export default useFriendList;
