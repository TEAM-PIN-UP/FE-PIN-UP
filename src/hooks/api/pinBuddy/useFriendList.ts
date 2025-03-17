import getApi from "@/api/getApi";
import { MemberDetails } from "@/interface/member";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useFriendList = ({
  id,
}: {
  id: string | number | undefined;
}): UseQueryResult<MemberDetails[]> => {
  const queryFn = async () => {
    if (id === undefined) return [];
    const response = await getApi.getFriends({ id });
    return response.data;
  };
  return useQuery({ queryFn, queryKey: ["friendships", id], enabled: !!id });
};

export default useFriendList;
