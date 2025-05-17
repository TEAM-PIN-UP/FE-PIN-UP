import useFriendList from "@/hooks/api/pinBuddy/useFriendList";
import {
  useReceivedFriendRequests,
  useSentFriendRequests,
} from "@/hooks/api/pinBuddy/useFriendRequests";
import { H3 } from "@/styles/font";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";
import PinbuddyListHeader from "./_components/Header";
import PinbuddySingle from "./_components/PinbuddySingle";

const PinbuddyList = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { uid: id } = useParams();

  const [index, setIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: friends } = useFriendList({ id });
  const { data: receivedFriendRequests } = useReceivedFriendRequests();
  const { data: sentFriendRequests } = useSentFriendRequests();
  const memberResponse = getMemberResponseObj();
  const isOtherUser = memberResponse?.memberId !== Number(id);

  // Switch to tab based on url params
  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const listType = queryParams.get("list");
    if (listType === "received") setIndex(1);
    else if (listType === "sent") setIndex(2);
    else setIndex(0);
  }, [search]);

  const updateUrl = (newIndex: number) => {
    const listType =
      newIndex === 0 ? "friends" : newIndex === 1 ? "received" : "sent";
    const searchParams = new URLSearchParams(search);
    searchParams.set("list", listType);
    navigate(`?list=${listType}`, { replace: true });
  };

  // Distinguish between swipe & click
  const handleSwitch = () => {
    setIsSwiping(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsSwiping(false);
    }, 50);
  };

  return (
    <StDiv>
      <PinbuddyListHeader />
      <StBlock />
      <div className="pinbuddy-tabs">
        <button
          className={`pinbuddy-tab ${index === 0 ? "active" : ""}`}
          onClick={() => updateUrl(0)}
        >
          핀버디
        </button>
        {!isOtherUser && (
          <>
            <button
              className={`pinbuddy-tab ${index === 1 ? "active" : ""}`}
              onClick={() => updateUrl(1)}
            >
              받은 신청
            </button>
            <button
              className={`pinbuddy-tab ${index === 2 ? "active" : ""}`}
              onClick={() => updateUrl(2)}
            >
              보낸 신청
            </button>
          </>
        )}
      </div>
      <SwipeableViews
        slideClassName="pinbuddy-container"
        enableMouseEvents
        index={isOtherUser ? 0 : index}
        disabled={isOtherUser}
        onChangeIndex={(i) => updateUrl(i)}
        onMouseDown={(e) => e.preventDefault()}
        onSwitching={handleSwitch}
        style={{ width: "100%", height: "100%" }}
      >
        <div className="tab pinbuddy-list">
          <div className="tab-page-header">
            <span className="header-title">핀버디</span>
            <span className="header-count">{friends ? friends.length : 0}</span>
          </div>
          {(!friends || friends.length === 0) && (
            <div className="list-empty">아직 핀버디가 없어요.</div>
          )}
          {friends &&
            friends.length > 0 &&
            friends.map((friend) => (
              <PinbuddySingle
                key={friend.memberId}
                data={friend}
                state="FRIEND"
                isSwiping={isSwiping}
                exposeActions={!isOtherUser}
              />
            ))}
        </div>
        <div className="tab received-list">
          <div className="tab-page-header">
            <span className="header-title">받은 신청</span>
            <span className="header-count">
              {receivedFriendRequests ? receivedFriendRequests.length : 0}
            </span>
          </div>
          {(!receivedFriendRequests || receivedFriendRequests.length === 0) && (
            <div className="list-empty">받은 핀버디 요청이 없어요.</div>
          )}
          {receivedFriendRequests &&
            receivedFriendRequests.length > 0 &&
            receivedFriendRequests.map((request) => (
              <PinbuddySingle
                key={request.id}
                data={request}
                state="RECEIVED_PENDING"
                isSwiping={isSwiping}
              />
            ))}
        </div>
        <div className="tab sent-list">
          <div className="tab-page-header">
            <span className="header-title">보낸 신청</span>
            <span className="header-count">
              {sentFriendRequests ? sentFriendRequests.length : 0}
            </span>
          </div>
          {(!sentFriendRequests || sentFriendRequests.length === 0) && (
            <div className="list-empty">보낸 핀버디 요청이 없어요.</div>
          )}
          {sentFriendRequests &&
            sentFriendRequests.length > 0 &&
            sentFriendRequests.map((request) => (
              <PinbuddySingle
                key={request.id}
                data={request}
                state="SENT_PENDING"
                isSwiping={isSwiping}
              />
            ))}
        </div>
      </SwipeableViews>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .pinbuddy-tabs {
    display: flex;
    flex-direction: row;
    align-items: start;
    padding: 0px var(--spacing_20);
    padding-top: var(--spacing_8);
    gap: var(--spacing_16);

    .pinbuddy-tab {
      ${H3}
      background-color: var(--white);
      border: none;
      cursor: pointer;
      color: var(--neutral_300);
      padding: var(--spacing_12) 0px var(--spacing_8) 0px;

      &.active {
        border-bottom: 3px solid var(--black);
        color: var(--neutral_800);
      }
    }
  }

  .react-swipeable-view-container {
    height: 100%;
  }

  .pinbuddy-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
  }

  .tab {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0px var(--spacing_20);
    box-sizing: border-box;
    gap: var(--spacing_24);

    .tab-page-header {
      display: flex;
      gap: var(--spacing_4);
      padding: 20px 0px 8px 0px;
      .header-title {
        ${H3}
      }
      .header-count {
        ${H3}
        color: var(--neutral_400);
      }
    }
    .list-empty {
      ${H3}
      color: var(--neutral_400);
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
    }
  }
`;

const StBlock = styled.div`
  width: 100%;
  height: 44px;
`;

export default PinbuddyList;
