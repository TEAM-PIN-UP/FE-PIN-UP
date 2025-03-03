import useFriendList from "@/hooks/api/pinBuddy/useFriendList";
import useFriendRequests from "@/hooks/api/pinBuddy/useFriendRequests";
import { H3 } from "@/style/font";
import { useEffect, useRef, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";
import PinbuddyListHeader from "./_components/Header";
import PinbuddySingle from "./_components/PinbuddySingle";

const PinbuddyList = () => {
  const [index, setIndex] = useState(0);
  const [, setIsSwiping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: friends } = useFriendList();
  const { data: requests } = useFriendRequests();

  // Distinguish between swipe & click
  const handleSwitch = () => {
    setIsSwiping(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsSwiping(false);
    }, 50);
  };

  // const handleClick = (item) => {
  //   if (isSwiping) return;
  //   navigate(`photo-review/${item.reviewId}`, {
  //     state: { item },
  //   });
  // };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <StDiv>
      <PinbuddyListHeader />
      <StBlock />
      <div className="pinbuddy-tabs">
        <button
          className={`pinbuddy-tab ${index === 0 ? "active" : ""}`}
          onClick={() => setIndex(0)}
        >
          핀버디
        </button>
        <button
          className={`pinbuddy-tab ${index === 1 ? "active" : ""}`}
          onClick={() => setIndex(1)}
        >
          받은 신청
        </button>
        <button
          className={`pinbuddy-tab ${index === 2 ? "active" : ""}`}
          onClick={() => setIndex(2)}
        >
          보낸 신청
        </button>
      </div>
      <SwipeableViews
        slideClassName="pinbuddy-container"
        enableMouseEvents
        index={index}
        onChangeIndex={(i) => setIndex(i)}
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
                data={{
                  memberResponse: friend,
                  relationType: "FRIEND",
                  reviewCount: 0,
                  pinBuddyCount: 0,
                }}
                state={"PENDING"}
              />
            ))}
        </div>
        <div className="tab received-list">
          <div className="tab-page-header">
            <span className="header-title">받은 신청</span>
            <span className="header-count">
              {requests ? requests.length : 0}
            </span>
          </div>
          {(!requests || requests.length === 0) && (
            <div className="list-empty">받은 핀버디 요청이 없어요.</div>
          )}
          {requests &&
            requests.length > 0 &&
            requests.map((request) => (
              <PinbuddySingle
                data={{
                  memberResponse: request.sender,
                  relationType: "PENDING",
                  reviewCount: 0,
                  pinBuddyCount: 0,
                }}
                state="PENDING"
              />
            ))}
        </div>
        <div className="tab sent-list">
          <div className="tab-page-header">
            <span className="header-title">보낸 신청</span>
            <span className="header-count">
              {requests ? requests.length : 0}
            </span>
          </div>
          {(!requests || requests.length === 0) && (
            <div className="list-empty">보낸 핀버디 요청이 없어요.</div>
          )}
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
