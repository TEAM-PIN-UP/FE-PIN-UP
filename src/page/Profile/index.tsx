import styled from "styled-components";

import Button from "@/components/Button";
import Header from "@/components/Header";
import useBottomSheetSnapPoints from "@/hooks/useBottomSheetSnapPoints";
import { H2, H3, H4 } from "@/style/font";
import useToastPopup from "@/utils/toastPopup";
import { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import ProfileButton from "./_components/ProfileButton";
import ReviewHistory from "./_components/ReviewHistory";
import UserIntroInput from "./_components/UserIntroInput";
import UserStatsSection, { Stat } from "./_components/UserStatsSection";

const userStats: Stat[] = [
  { label: "리뷰", value: 8 },
  { label: "평균 평점", value: 4.5 },
  { label: "핀버디", value: 552 },
];

const ProfilePage: React.FC = () => {
  // Bottom sheet logic
  const sheetRef = useRef<SheetRef>();
  const { attachRef } = useBottomSheetSnapPoints();
  const [left, setLeft] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const updateLeftPosition = () => {
    const newLeft = window.innerWidth > 440 ? (window.innerWidth - 440) / 2 : 0;
    setLeft(newLeft);
  };

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
    <StDiv ref={attachRef}>
      <Header>
        <Header.Left>
          <span className="h2">My</span>
        </Header.Left>
        <Header.Right>
          <span className="h2">알림</span>
          <span className="h2">설정</span>
        </Header.Right>
      </Header>
      <div className="user-section">
        <div className="profile">
          <img src="https://picsum.photos/200" className="profile-image" />
          <UserStatsSection stats={userStats} />
        </div>
        <div className="username">레벨조이</div>
        <UserIntroInput />
        <div className="profile-buttons">
          <ProfileButton icon="" text="핀버디 추가" />
          <ProfileButton
            icon=""
            text="프로필 공유"
            onClick={() => setIsSheetOpen(true)}
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
        <ReviewHistory index={index} onChangeIndex={(i) => setIndex(i)} />
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
  );
};

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 48px;

  .profile {
    display: flex;
    flex-direction: row;
    padding: var(--spacing_20);
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
    margin-bottom: var(--spacing_16);
  }

  .profile-buttons {
    display: flex;
    flex-direction: row;
    padding: var(--spacing_12) var(--spacing_20);
    gap: var(--spacing_12);
  }

  .review-heading {
    display: flex;
    flex-direction: row;
    align-items: start;
    padding: 0px var(--spacing_20);
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

const StSheet = styled(Sheet)<{ $left: number }>`
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

export default ProfilePage;
