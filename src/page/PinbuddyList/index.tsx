import useFriendList from "@/hooks/api/pinbuddyList/useFriendList";
import { GetPinBuddySearchResponse } from "@/interface/apiInterface";
import { ReceivedFriendRequestResponse } from "@/interface/member";
import { H3 } from "@/style/font";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";
import PinbuddyListHeader from "./_components/Header";
import PinbuddySingle from "./_components/PinbuddySingle";

const PinbuddyList = () => {
  const location = useLocation();
  const friendRequests = location.state
    .newFriendRequests as ReceivedFriendRequestResponse[];

  const [index, setIndex] = useState(0);
  const [, setIsSwiping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: friends } = useFriendList();

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
          {friends && (
            <div className="tab-page-header">
              <span className="header-title">핀버디</span>
              <span className="header-count">{friends.length}</span>
            </div>
          )}
          {friends &&
            friends.length > 0 &&
            friends.map((f) => (
              <PinbuddySingle
                data={{
                  memberResponse: f,
                  relationType: "FRIEND",
                  reviewCount: 0,
                  pinBuddyCount: 0,
                }}
                state={"PENDING"}
              />
            ))}
        </div>
        <div className="tab received-list">
          {friendRequests && (
            <div className="tab-page-header">
              <span className="header-title">받은 신청</span>
              <span className="header-count">{friendRequests.length}</span>
            </div>
          )}
          {friendRequests &&
            friendRequests.length > 0 &&
            friendRequests.map((request) => (
              <PinbuddySingle
                data={
                  {
                    memberResponse: request.sender,
                    relationType: "PENDING",
                    reviewCount: 0,
                    pinBuddyCount: 0,
                  } as GetPinBuddySearchResponse
                }
                state="PENDING"
              />
            ))}
        </div>
        <div className="tab sent-list">
          {friendRequests && (
            <div className="tab-page-header">
              <span className="header-title">보낸 신청</span>
              <span className="header-count">{friendRequests.length}</span>
            </div>
          )}
        </div>
      </SwipeableViews>
      <div>{/* {data?.map((val)=><PinbuddySingle data={val}/>)} */}</div>
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
  }
`;

const StBlock = styled.div`
  width: 100%;
  height: 44px;
`;

export default PinbuddyList;
