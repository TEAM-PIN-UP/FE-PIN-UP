import Button from "@/components/Button";
import { MemberDetails } from "@/interface/member";
import { paths } from "@/routes/paths";
import { B3, H1, H3 } from "@/style/font";
import checkLogin from "@/utils/checkLogin";
import useToastPopup from "@/utils/toastPopup";
import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserStatsSection, { Stat } from "./UserStatsSection";

interface ShareSheetProps {
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  memberResponse?: MemberDetails;
}

const ShareSheet: React.FC<ShareSheetProps> = ({
  isSheetOpen,
  setIsSheetOpen,
  memberResponse,
}) => {
  const navigate = useNavigate();
  const toast = useToastPopup();

  const sheetRef = useRef<SheetRef>();
  const [left, setLeft] = useState(0);
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

  const [showLogin, setShowLogin] = useState(false);

  const handleShare = async () => {
    if (checkLogin()) {
      try {
        await navigator.clipboard.writeText("profile");
        setIsSheetOpen(false);
        toast("링크를 클립보드에 복사했어요.");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    } else {
      setShowLogin(true);
    }
  };

  return (
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
          {!showLogin && (
            <div className="profile-share">
              <img
                src={memberResponse?.profilePictureUrl}
                className="profile-image"
              />
              <span className="username">{memberResponse?.nickname}</span>
              <UserStatsSection
                stats={
                  [
                    {
                      label: "리뷰",
                      value: memberResponse?.reviewCount,
                    },
                    {
                      label: "평균 평점",
                      value: memberResponse?.averageStarRating,
                    },
                    {
                      label: "핀버디",
                      value: memberResponse?.pinBuddyCount,
                    },
                  ] as Stat[]
                }
              />
              <Button
                size="xlarge"
                onClick={handleShare}
                className="share-button"
              >
                프로필 공유
              </Button>
            </div>
          )}
          {showLogin && (
            <div className="suggest-login">
              <div className="content-group">
                <p className="title">로그인이 필요해요!</p>
                <div className="body-group">
                  <p className="body">로그인 후 핀업의</p>
                  <p className="body">
                    다양한 서비스를 편리하게 이용해 보세요.
                  </p>
                </div>
              </div>
              <div className="button-group">
                <Button
                  className="signup-button"
                  size="xlarge"
                  onClick={() => navigate(paths.signup())}
                >
                  로그인/회원가입
                </Button>
                <button
                  className="close-button"
                  onClick={() => setIsSheetOpen(false)}
                >
                  괜찮아요
                </button>
              </div>
            </div>
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        onTap={() => setIsSheetOpen(false)}
        style={{ backgroundColor: `var(--transparent_50)` }}
      />
    </StSheet>
  );
};

export default ShareSheet;

const StSheet = styled(Sheet)<{ $left: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: var(--max_width);
  min-width: var(--min_width);
  left: ${({ $left }) => `${$left}px !important`};

  .content {
    flex: 1;

    .profile-share {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: var(--spacing_24);
      padding-bottom: var(--spacing_48);
      align-items: center;
      justify-content: start;
      height: 100%;
      z-index: 99999999;

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
        max-width: 400px;
        margin: var(--spacing_48) var(--spacing_20);
        z-index: 999999999;
      }
    }

    .suggest-login {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      padding: 28px 24px;
      text-align: center;

      .content-group {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: var(--spacing_32);

        .title {
          ${H1}
        }
        .body-group {
          gap: 6px;
          .body {
            ${B3}
          }
        }
      }
      .button-group {
        .signup-button {
          margin-top: var(--spacing_48);
        }
        .close-button {
          background-color: transparent;
          border: none;
          color: var(--neutral_800);
          cursor: pointer;
          margin-top: var(--spacing_16);
        }
      }
    }
  }
`;
