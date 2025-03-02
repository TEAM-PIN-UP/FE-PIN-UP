import getApi from "@/api/getApi";
import Button from "@/components/Button";
import Header from "@/components/Header";
import useBottomSheetSnapPoints from "@/hooks/useBottomSheetSnapPoints";
import useCheckLoginAndRoute from "@/hooks/useCheckLoginAndRoute";
import addUser from "@/image/icons/addUser.svg";
import defaultProfile from "@/image/icons/defaultProfile.svg";
import notificationActive from "@/image/icons/notificationActive.svg";
import notificationInactive from "@/image/icons/notificationInactive.svg";
import settings from "@/image/icons/settings.svg";
import share from "@/image/icons/share.svg";
import { MyFeed, ReceivedFriendRequestResponse } from "@/interface/member";
import { Review } from "@/interface/review";
import { B3, B4, H1, H2, H3, H4 } from "@/style/font";
import checkLogin from "@/utils/checkLogin";
import useToastPopup from "@/utils/toastPopup";
import { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileButton from "./_components/ProfileButton";
import ReviewHistory from "./_components/reviews/ReviewHistory";
import UserStatsSection, { Stat } from "./_components/UserStatsSection";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToastPopup();
  useCheckLoginAndRoute();

  // Bottom sheet logic
  const sheetRef = useRef<SheetRef>();
  const { attachRef } = useBottomSheetSnapPoints();
  const [left, setLeft] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const updateLeftPosition = () => {
    const newLeft = window.innerWidth > 440 ? (window.innerWidth - 440) / 2 : 0;
    setLeft(newLeft);
  };

  const [myFeed, setMyFeed] = useState<MyFeed | null>(null);
  const [photos, setPhotos] = useState<Review[] | null>(null);
  const [texts, setTexts] = useState<Review[] | null>(null);
  const [newFriendRequests, setNewFriendRequests] = useState<
    ReceivedFriendRequestResponse[] | null
  >(null);

  useEffect(() => {
    try {
      // Fetch current user profile
      const getMemberDetails = async () => {
        try {
          const response = await getApi.getMyFeed();
          setMyFeed(response.data);
        } catch (error) {
          console.error("Error fetching member details:", error);
        }
      };
      // Get pending friend requests
      const getPendingFriendRequests = async () => {
        try {
          const response = await getApi.getReceivedFriendRequests();
          setNewFriendRequests(
            response.data as ReceivedFriendRequestResponse[]
          );
        } catch (error) {
          console.error("Error fetching pending friend requests:", error);
        }
      };
      getMemberDetails();
      getPendingFriendRequests();
    } catch (error) {
      console.error(error);
    }
    return () => {};
  }, [navigate, toast]);

  useEffect(() => {
    if (!myFeed?.memberReviews) return;
    const p: Review[] = [];
    const t: Review[] = [];

    myFeed.memberReviews.forEach((review: Review) => {
      if (review.reviewImageUrls.length > 0) p.unshift(review);
      else t.unshift(review);
    });

    setPhotos(p);
    setTexts(t);
  }, [myFeed]);

  useEffect(() => {
    // Update bottom sheet alignment on window resize
    updateLeftPosition();
    window.addEventListener("resize", updateLeftPosition);
    return () => {
      window.removeEventListener("resize", updateLeftPosition);
    };
  }, []);

  // Review history swiper view state
  const [index, setIndex] = useState(0);

  const handleNotifications = () => {
    navigate("notifications", {
      state: { newFriendRequests },
    });
  };
  const handleSettings = () => {
    navigate("settings");
  };

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
    <>
      <StDiv ref={attachRef}>
        <Header>
          <Header.Left>
            <span className="h2">My</span>
          </Header.Left>
          <Header.Right>
            <img
              src={
                newFriendRequests && newFriendRequests?.length > 0
                  ? notificationActive
                  : notificationInactive
              }
              onClick={handleNotifications}
              className="button"
            />
            <img src={settings} onClick={handleSettings} className="button" />
          </Header.Right>
        </Header>

        <div className="user-section">
          <div className="profile">
            <img
              src={
                myFeed?.memberResponse.profilePictureUrl
                  ? myFeed.memberResponse.profilePictureUrl
                  : defaultProfile
              }
              className="profile-image"
            />
            <UserStatsSection
              stats={
                [
                  { label: "리뷰", value: myFeed?.reviewCount },
                  {
                    label: "평균 평점",
                    value: myFeed?.averageStarRating,
                  },
                  {
                    label: "핀버디",
                    value: myFeed?.pinBuddyCount,
                    onClick: () => {
                      navigate("/profile/pinbuddylist", {
                        state: { newFriendRequests },
                      });
                    },
                  },
                ] as Stat[]
              }
            />
          </div>
          <div className="username">{myFeed?.memberResponse.nickname}</div>
          <div className="intro">{myFeed?.memberResponse.bio}</div>

          <div className="profile-buttons">
            <ProfileButton
              icon={share}
              text="프로필 공유"
              onClick={() => setIsSheetOpen(true)}
            />
            <ProfileButton
              icon={addUser}
              text="핀버디 추가"
              onClick={() => navigate(`pinbuddySearch`)}
            />
          </div>

          <div className="review-heading">
            <button
              className={`review-filter ${index === 0 ? "active" : ""}`}
              onClick={() => setIndex(0)}
            >
              포토 리뷰 {photos?.length}
            </button>
            <button
              className={`review-filter ${index === 1 ? "active" : ""}`}
              onClick={() => setIndex(1)}
            >
              텍스트 리뷰 {texts?.length}
            </button>
          </div>
        </div>
        <div className="review-section">
          <ReviewHistory
            index={index}
            onChangeIndex={(i) => setIndex(i)}
            photos={photos ? photos : []}
            texts={texts ? texts : []}
          />
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
              {!showLogin && (
                <div className="profile-share">
                  <img
                    src={myFeed?.memberResponse.profilePictureUrl}
                    className="profile-image"
                  />
                  <span className="username">
                    {myFeed?.memberResponse.nickname}
                  </span>
                  <UserStatsSection
                    stats={
                      [
                        { label: "리뷰", value: myFeed?.reviewCount },
                        {
                          label: "평균 평점",
                          value: myFeed?.averageStarRating,
                        },
                        {
                          label: "핀버디",
                          value: myFeed?.pinBuddyCount,
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
                      size="full"
                      onClick={() => navigate("/signup")}
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
      </StDiv>
    </>
  );
};

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

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
  }

  .intro {
    ${B4}
    color: var(--neutral_600);
    text-align: start;
    padding: 0px var(--spacing_20);
    padding-top: var(--spacing_12);
  }

  .profile-buttons {
    display: flex;
    flex-direction: row;
    padding: var(--spacing_20);
    padding-bottom: var(--spacing_16);
    gap: var(--spacing_12);
  }

  .review-heading {
    display: flex;
    flex-direction: row;
    align-items: start;
    padding: 0px var(--spacing_20);
    padding-top: var(--spacing_8);
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
        max-width: 400px;
        position: fixed;
        bottom: var(--spacing_24);
        margin: 0px var(--spacing_20);
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

export default Profile;
