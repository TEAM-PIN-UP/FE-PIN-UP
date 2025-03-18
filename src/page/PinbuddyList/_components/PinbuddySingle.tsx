import useDeleteFriend from "@/hooks/api/pinBuddy/useDeleteFriend";
import useDeleteFriendRequests from "@/hooks/api/pinBuddy/useDeleteFriendRequest";
import usePatchFriendRequests from "@/hooks/api/pinBuddy/usePatchFriendRequests";
import defaultProfile from "@/image/icons/defaultProfile.svg";
import { FriendRequestResponse, MemberDetails } from "@/interface/member";
import { B3, B5, H6 } from "@/style/font";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface PinBuddySingleProps {
  data: FriendRequestResponse | MemberDetails;
  state: "FRIEND" | "SENT_PENDING" | "RECEIVED_PENDING";
}

type requestControllerParams = "ACTION1" | "ACTION2";

const PinbuddySingle: React.FC<PinBuddySingleProps> = ({ data, state }) => {
  const { acceptFriendRequest, rejectFriendRequest } = usePatchFriendRequests();
  const deleteFriendRequest = useDeleteFriendRequests();
  const deleteFriend = useDeleteFriend();
  const [action1, setAction1] = useState("");
  const [action2, setAction2] = useState("");

  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [nickname, setNickname] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  const [friendCount, setFriendCount] = useState(0);

  const isMemberDetails = (
    data: FriendRequestResponse | MemberDetails
  ): data is MemberDetails => {
    return (data as MemberDetails).memberId !== undefined;
  };

  useEffect(() => {
    if (isMemberDetails(data)) {
      setAction1("삭제");
      setProfilePictureUrl(data.profilePictureUrl);
      setNickname(data.nickname);
      setReviewCount(data.reviewCount);
      setFriendCount(data.pinBuddyCount);
    } else if (state === "RECEIVED_PENDING") {
      const sender = data.sender;
      setAction1("수락");
      setAction2("거절");
      setProfilePictureUrl(sender.profilePictureUrl);
      setNickname(sender.nickname);
      setReviewCount(sender.reviewCount);
      setFriendCount(sender.pinBuddyCount);
    } else if (state === "SENT_PENDING") {
      const receiver = data.receiver;
      setAction1("신청 취소");
      setProfilePictureUrl(receiver.profilePictureUrl);
      setNickname(receiver.nickname);
      setReviewCount(receiver.reviewCount);
      setFriendCount(receiver.pinBuddyCount);
    }
    if (profilePictureUrl === "") setProfilePictureUrl(defaultProfile);
  }, [data, profilePictureUrl, state]);

  const requestController = (decision: requestControllerParams) => {
    if (isMemberDetails(data)) {
      if (data.memberId) deleteFriend.mutate({ friendId: data.memberId });
    } else
      switch (state) {
        case "RECEIVED_PENDING":
          if (decision === "ACTION1" && data)
            // Accept request
            acceptFriendRequest.mutate({ request: data });
          else if (decision === "ACTION2" && data)
            // Reject request
            rejectFriendRequest.mutate({ request: data });
          break;
        case "SENT_PENDING":
          if (data) deleteFriendRequest.mutate({ request: data });
          break;
        default:
          break;
      }
  };

  return (
    <StSearchResultSingle>
      <img src={profilePictureUrl} />

      <div className="profileInfo">
        <div className="name">{nickname}</div>
        <div className="counts">
          <div className="singleInfo">
            <span className="title">리뷰</span>
            <span>{reviewCount}</span>
          </div>
          <div className="singleInfo">
            <span className="title">핀버디</span>
            <span>{friendCount}</span>
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
