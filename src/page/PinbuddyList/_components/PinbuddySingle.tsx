import useDeleteFriend from "@/hooks/api/pinBuddy/useDeleteFriend";
import useDeleteFriendRequests from "@/hooks/api/pinBuddy/useDeleteFriendRequest";
import usePatchFriendRequests from "@/hooks/api/pinBuddy/usePatchFriendRequests";
import usePostFriendRequests from "@/hooks/api/pinBuddy/usePostFriendRequest";
import defaultProfile from "@/image/icons/defaultProfile.svg";
import { GetPinBuddySearchResponse } from "@/interface/member";
import { relationType, requestRelationType } from "@/interface/place";
import { B3, B5, H6 } from "@/style/font";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface PinBuddySingleProps {
  data: GetPinBuddySearchResponse;
  state: relationType | requestRelationType;
  friendId?: number;
  requestId?: number;
}

type requestControllerParams = "ACTION1" | "ACTION2";

const PinbuddySingle: React.FC<PinBuddySingleProps> = ({
  data,
  state,
  friendId,
  requestId,
}) => {
  const friendRequest = usePostFriendRequests();
  const { acceptFriendRequest, rejectFriendRequest } = usePatchFriendRequests();
  const deleteFriendRequest = useDeleteFriendRequests();
  const deleteFriend = useDeleteFriend();
  const [action1, setAction1] = useState("");
  const [action2, setAction2] = useState("");

  useEffect(() => {
    switch (state) {
      case "FRIEND":
        setAction1("삭제");
        break;
      case "PENDING":
      case "SENT_PENDING":
        setAction1("신청 취소");
        break;
      case "SELF":
        setAction1("나야");
        break;
      case "STRANGER":
        setAction1("친구 요청");
        break;
      case "RECEIVED_PENDING":
        setAction1("수락");
        setAction2("거절");
        break;
    }
  }, [data.relationType, state]);

  const requestController = (decision: requestControllerParams) => {
    switch (state) {
      case "STRANGER":
        friendRequest.mutate({ receiverId: data.memberResponse.memberId });
        break;
      case "RECEIVED_PENDING":
        if (decision === "ACTION1" && requestId)
          // Accept request
          acceptFriendRequest.mutate({ requestId });
        else if (decision === "ACTION2" && requestId)
          // Reject request
          rejectFriendRequest.mutate({ requestId });
        break;
      case "SENT_PENDING":
        if (requestId) deleteFriendRequest.mutate({ requestId });
        break;
      case "FRIEND":
        if (friendId) deleteFriend.mutate({ friendId });
        break;

      default:
        break;
    }
  };

  return (
    <StSearchResultSingle>
      <img
        src={
          data.memberResponse.profilePictureUrl === ""
            ? defaultProfile
            : data.memberResponse.profilePictureUrl
        }
      />
      <div className="profileInfo">
        <div className="name">{data.memberResponse.nickname}</div>
        <div className="counts">
          <div className="singleInfo">
            <span className="title">리뷰</span>
            <span>{data.reviewCount}</span>
          </div>
          <div className="singleInfo">
            <span className="title">핀버디</span>
            <span>{data.pinBuddyCount}</span>
          </div>
        </div>
      </div>
      <div className="button-area">
        <div
          className="profile-button b1"
          onClick={() => requestController("ACTION1")}
        >
          {action1}
        </div>
        {action2 && (
          <div
            className="profile-button b2"
            onClick={() => requestController("ACTION2")}
          >
            {action2}
          </div>
        )}
      </div>
    </StSearchResultSingle>
  );
};

const StSearchResultSingle = styled.div`
  display: flex;
  width: 100%;
  img {
    width: 40px;
    height: 40px;
    border-radius: var(--radius_circle);
  }
  .profileInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    margin-left: 8px;
    text-align: left;
    .name {
      ${B3}
    }
    .counts {
      display: flex;
      gap: 8px;
      ${B5}
      .singleInfo {
        display: flex;
        gap: 2px;
        .title {
          color: var(--neutral_400);
        }
      }
    }
  }
  .button-area {
    display: flex;
    flex-direction: row;
    margin: auto 0 auto auto;
    gap: var(--spacing_8);

    .profile-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 30px;
      border-radius: 6px;
      ${H6}
      cursor:pointer;

      &.b1 {
        background-color: var(--neutral_100);
      }

      &.b2 {
        border: 1px solid var(--neutral_100);
      }
    }
  }
`;

export default PinbuddySingle;
