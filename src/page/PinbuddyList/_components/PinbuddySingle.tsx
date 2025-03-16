import usePostFriendRequest from "@/hooks/api/pinBuddy/usePostFriendRequest";
import { GetPinBuddySearchResponse } from "@/interface/member";
import { relationType } from "@/interface/place";
import { B3, B5, H6 } from "@/style/font";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface PinBuddySingleProps {
  data: GetPinBuddySearchResponse;
  state: relationType;
}

const PinbuddySingle: React.FC<PinBuddySingleProps> = ({ data }) => {
  const friendRequest = usePostFriendRequest();
  const [currentState, setCurrentState] = useState<string>("");

  useEffect(() => {
    if (data.relationType === "FRIEND") {
      setCurrentState("삭제");
    } else if (data.relationType === "PENDING") {
      setCurrentState("요청보냄");
    } else if (data.relationType === "SELF") {
      setCurrentState("나야");
    } else if (data.relationType === "STRANGER") {
      setCurrentState("친구 요청");
    }
  }, [data.relationType]);

  const requestController = () => {
    if (data.relationType === "STRANGER") {
      friendRequest.mutate({ receiverId: data.memberResponse.memberId });
    }
  };

  return (
    <StSearchResultSingle relation={data.relationType}>
      <img src={data.memberResponse.profilePictureUrl} />
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
      <div className="profileButton" onClick={requestController}>
        {currentState}
      </div>
    </StSearchResultSingle>
  );
};

const StSearchResultSingle = styled.div<{ relation: relationType }>`
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
  .profileButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 30px;
    border-radius: 6px;
    background-color: var(--neutral_100);
    margin: auto 0 auto auto;
    color: ${(props) =>
      props.relation === "STRANGER" ? "" : "var(--neutral_500)"};
    ${H6}
    cursor: ${(props) =>
      props.relation === "STRANGER" ? "pointer" : "default"};
  }
`;

export default PinbuddySingle;
