import { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import styled from "styled-components";

import Button from "@/components/Button";
import Header from "@/components/Header";
import useBottomSheetSnapPoints from "@/hooks/useBottomSheetSnapPoints";
import addUser from "@/image/icons/addUser.svg";
import share from "@/image/icons/share.svg";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import { B4, H2, H3, H4 } from "@/style/font";
import useToastPopup from "@/utils/toastPopup";
import { useNavigate } from "react-router-dom";
import ProfileButton from "../Profile/_components/ProfileButton";
import UserStatsSection, {
  Stat,
} from "../Profile/_components/UserStatsSection";
import ProfileReview from "./_components/ProfileReview";
import RequestButton from "./_components/RequestButton";

const userStats: Stat[] = [
  { label: "리뷰", value: 8 },
  { label: "평균 평점", value: 4.5 },
  { label: "핀버디", value: 552 },
];

export type requestState = "friend" | "pending" | "notFriend";

const OtherProfile: React.FC = () => {
  const navigate = useNavigate();

  // Bottom sheet logic
  const sheetRef = useRef<SheetRef>();
  const { attachRef } = useBottomSheetSnapPoints();
  const [left, setLeft] = useState(0);
  const [nickname, setNickname] = useState<string | null>("은채vv");
  const [requestState, setRequestState] = useState<requestState>("notFriend"); // 데이터 받아온 값으로 변경
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const updateLeftPosition = () => {
    const newLeft = window.innerWidth > 440 ? (window.innerWidth - 440) / 2 : 0;
    setLeft(newLeft);
  };

  useEffect(() => {
    setNickname("");
    setRequestState("friend");
  }, []);

  useEffect(() => {
    // Update bottom sheet alignment on window resize
    updateLeftPosition();
    window.addEventListener("resize", updateLeftPosition);

    return () => {
      window.removeEventListener("resize", updateLeftPosition);
    };
  }, []);

  const toast = useToastPopup();

  // Review history swiper view state
  const [index, setIndex] = useState(0);

  return (
    <>
      <StDiv ref={attachRef}>
        <Header>
          <Header.Left className="backButton">
            {" "}
            <img
              src={chevronLeft}
              className="back-button"
              onClick={() => window.history.back()}
            />
          </Header.Left>
          <Header.Center className="center">{nickname}</Header.Center>
        </Header>
        <div className="user-section">
          <div className="profile">
            <img src="https://picsum.photos/200" className="profile-image" />
            <UserStatsSection stats={userStats} />
          </div>
          <div className="username">{nickname}</div>
          {/* <UserIntroInput /> */}
          <div className="stateMessage">성수 맛집 내가 다 추천해줌</div>

          <div className="profile-buttons">
            <ProfileButton
              icon={share}
              text="프로필 공유"
              onClick={() => setIsSheetOpen(true)}
            />
            <RequestButton
              icon={addUser}
              color="var(--neutral_800)"
              requestState={requestState}
              onClick={() => navigate(`pinbuddySearch`)}
            />
          </div>

          <div className="review-heading">
            <button
              className={`review-filter ${index === 0 ? "active" : ""}`}
              onClick={() => setIndex(0)}
            >
              포토 리뷰 24
            </button>
            <button
              className={`review-filter ${index === 1 ? "active" : ""}`}
              onClick={() => setIndex(1)}
            >
              텍스트 리뷰 3
            </button>
          </div>
        </div>
        <div className="review-section">
          <ProfileReview index={index} onChangeIndex={(i) => setIndex(i)} />
        </div>

        {/* Share Profile */}
        <StSheet
          ref={sheetRef}
          isOpen={isSheetOpen}
          onClose={() => {
            setIsSheetOpen(false);
          }}
          snapPoints={[0.5]}
          $left={left}
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content className="content">
              <div className="profile-share">
                <img
                  src={"https://picsum.photos/200"}
                  className="profile-image"
                />
                <span className="username">레벨조이</span>
                <UserStatsSection stats={userStats} />
                <Button
                  size="xlarge"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText("profile");
                      setIsSheetOpen(false);
                      toast("링크를 클립보드에 복사했어요.");
                    } catch (err) {
                      console.error("Failed to copy: ", err);
                    }
                  }}
                  className="share-button"
                >
                  프로필 공유
                </Button>
              </div>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop
            onTap={() => setIsSheetOpen(false)}
            style={{ backgroundColor: `var(--transparent_50)` }}
          />
        </StSheet>
      </StDiv>
    </>
  );
};

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .backButton {
    cursor: pointer;
  }
  .center {
    ${H3}
  }
  .button {
    cursor: pointer;
  }

  .profile {
    display: flex;
    flex-direction: row;
    padding: var(--spacing_20);
    margin-top: 48px;
    align-items: center;
  }

  .profile-image {
    width: 56px;
    height: 56px;
    background-size: cover;
    background-position: center;
    border-radius: var(--radius_circle);
  }

  .username {
    ${H4}
    display: flex;
    justify-content: start;
    padding: 0px var(--spacing_20);
    margin-bottom: var(--spacing_12);
  }
  .stateMessage {
    ${B4}
    color : var(--neutral_600);
    text-align: left;
    padding: 0 20px;
  }

  .profile-buttons {
    display: flex;
    flex-direction: row;
    padding: var(--spacing_20) var(--spacing_20) var(--spacing_16);
    gap: var(--spacing_12);
  }

  .review-heading {
    display: flex;
    flex-direction: row;
    align-items: start;
    padding: 0px var(--spacing_20);
    /* margin-top: var(--spacing_8); */
    gap: var(--spacing_16);

    .review-filter {
      ${H4}
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

  .review-section {
    flex-grow: 1;
    overflow-y: auto;
  }

  .h2 {
    ${H2}
  }
`;

const StSheet = styled(Sheet) <{ $left: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 440px;
  min-width: 320px;
  left: ${({ $left }) => `${$left}px !important`};

  .content {
    flex: 1;

    .profile-share {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: var(--spacing_24);
      align-items: center;
      justify-content: center;

      .profile-image {
        width: 56px;
        height: 56px;
        background-size: cover;
        background-position: center;
        border-radius: var(--radius_circle);
        margin-bottom: var(--spacing_12);
      }

      .username {
        ${H3}
        margin-bottom: var(--spacing_32);
      }

      .share-button {
        position: fixed;
        bottom: var(--spacing_24);
        margin: 0px var(--spacing_20);
      }
    }
  }
`;

export default OtherProfile;
