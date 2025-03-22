import Header from "@/components/Header";
import { useReceivedFriendRequests } from "@/hooks/api/pinBuddy/useFriendRequests";
import useProfileDetails from "@/hooks/api/profile/useProfileDetails";
import {
  useGetPhotoReviews,
  useGetTextReviews,
} from "@/hooks/api/review/useGetReviews";
import useBottomSheetSnapPoints from "@/hooks/useBottomSheetSnapPoints";
import defaultProfile from "@/image/icons/defaultProfile.svg";
import notificationActive from "@/image/icons/notificationActive.svg";
import notificationInactive from "@/image/icons/notificationInactive.svg";
import settings from "@/image/icons/settings.svg";
import { paths } from "@/routes/paths";
import { B4, H2, H4 } from "@/style/font";
import { getMemberResponseObj } from "@/utils/getFromLocalStorage";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import FriendButton from "./_components/FriendButton";
import ReviewHistory from "./_components/reviews/ReviewHistory";
import ShareButton from "./_components/ShareButton";
import ShareSheet from "./_components/ShareSheet";
import UserStatsSection, { Stat } from "./_components/UserStatsSection";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { uid: id } = useParams();
  const memberResponse = getMemberResponseObj();
  const isOtherUser = memberResponse?.memberId !== Number(id);

  // Bottom sheet logic
  const { attachRef } = useBottomSheetSnapPoints();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [photoReviewsPage, setPhotoReviewsPage] = useState(0);
  const [textReviewsPage, setTextReviewsPage] = useState(0);
  console.log(setPhotoReviewsPage, setTextReviewsPage);
  const pageSize = 15;

  const { data: memberFeed, isLoading: isMemberFeedLoading } =
    useProfileDetails(id);
  const { data: photoReviews } = useGetPhotoReviews({
    id,
    page: photoReviewsPage,
    size: pageSize,
  });
  const { data: textReviews } = useGetTextReviews({
    id,
    page: textReviewsPage,
    size: pageSize,
  });
  const { data: receivedFriendRequests } = useReceivedFriendRequests();

  // Review history swiper view state
  const [index, setIndex] = useState(0);

  return (
    <>
      <StDiv ref={attachRef}>
        <Header>
          <Header.Left>
            <span className="h2">프로필</span>
          </Header.Left>
          {!isOtherUser && (
            <Header.Right>
              <img
                src={
                  receivedFriendRequests && receivedFriendRequests.length > 0
                    ? notificationActive
                    : notificationInactive
                }
                onClick={() => navigate(paths.profile.notifications())}
                className="button"
              />
              <img
                src={settings}
                onClick={() => navigate(paths.profile.settings())}
                className="button"
              />
            </Header.Right>
          )}
        </Header>

        <div className="user-section">
          <div className="profile">
            <img
              src={
                memberFeed && memberFeed.memberResponse.profilePictureUrl !== ""
                  ? memberFeed.memberResponse.profilePictureUrl
                  : defaultProfile
              }
              className="profile-image"
            />
            <UserStatsSection
              isLoading={isMemberFeedLoading}
              stats={
                [
                  {
                    label: "리뷰",
                    value: memberFeed?.memberResponse.reviewCount,
                  },
                  {
                    label: "평균 평점",
                    value: memberFeed?.memberResponse.averageStarRating,
                  },
                  {
                    label: "핀버디",
                    value: memberFeed?.memberResponse.pinBuddyCount,
                    onClick: () => {
                      if (!id) return;
                      return navigate(paths.profile.id(id).friends());
                    },
                  },
                ] as Stat[]
              }
            />
          </div>
          <div className="username">{memberFeed?.memberResponse.nickname}</div>
          <div className="intro">{memberFeed?.memberResponse.bio}</div>

          <div className="profile-buttons">
            <ShareButton onClick={() => setIsSheetOpen(true)} />
            <FriendButton isOtherUser={isOtherUser} />
          </div>

          <div className="review-heading">
            <button
              className={`review-filter ${index === 0 ? "active" : ""}`}
              onClick={() => setIndex(0)}
            >
              포토 리뷰 {photoReviews?.length}
            </button>
            <button
              className={`review-filter ${index === 1 ? "active" : ""}`}
              onClick={() => setIndex(1)}
            >
              텍스트 리뷰 {textReviews?.length}
            </button>
          </div>
        </div>
        <div className="review-section">
          <ReviewHistory
            index={index}
            onChangeIndex={(i) => setIndex(i)}
            memberFeed={memberFeed}
            photos={photoReviews ? photoReviews : []}
            texts={textReviews ? textReviews : []}
          />
        </div>

        {/* Share Profile */}
        <ShareSheet
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          memberResponse={memberFeed?.memberResponse}
        />
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

export default Profile;
