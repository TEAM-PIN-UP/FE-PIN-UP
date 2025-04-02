import usePostFriendRequests from "@/hooks/api/pinBuddy/usePostFriendRequest";
import useProfileDetails from "@/hooks/api/profile/useProfileDetails";
import addUser from "@/image/icons/addUser.svg";
import addUserWhite from "@/image/icons/addUserWhite.svg";
import { relationType } from "@/interface/place";
import { paths } from "@/routes/paths";
import { ModalProps } from "@/store/modalStore";
import { B4 } from "@/style/font";
import useModalPopup from "@/utils/modalPopup";
import useToastPopup from "@/utils/toastPopup";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const FriendButton: React.FC = () => {
  const navigate = useNavigate();
  const { uid: id } = useParams();
  const { openModal, closeModal } = useModalPopup();
  const toast = useToastPopup();

  const { data: userData } = useProfileDetails(id);
  const friendRequest = usePostFriendRequests();
  const friendRequestModal: ModalProps = {
    type: "cancel-ok",
    title: "핀버디를 신청하시겠어요?",
    body: ["상대가 신청을 수락해야", "핀버디가 맺어져요."],
    okButtonText: "신청",
    cancelButtonText: "취소",
    onOkButtonClick: () => {
      if (id) {
        friendRequest.mutate({ receiverId: id });
        toast("핀버디 신청이 완료되었어요.");
      } else {
        console.error("Send friend request failed: no receiver id.");
        toast("핀버디 신청이 실패했어요.");
      }
      closeModal();
    },
    onCancelButtonClick: closeModal,
  };

  const handleAddFriend = () => {
    if (userData?.relationType === "STRANGER") openModal(friendRequestModal);
    else if (userData?.relationType === "SELF")
      navigate(paths.profile.search());
  };
  return (
    <StButton onClick={handleAddFriend} $relationType={userData?.relationType}>
      <img
        src={
          userData?.relationType === "STRANGER" ||
          userData?.relationType === "FRIEND"
            ? addUserWhite
            : addUser
        }
      />
      <span>
        {userData?.relationType === "SELF"
          ? "핀버디 추가"
          : userData?.relationType === "PENDING"
          ? "신청 완료"
          : "핀버디 신청"}
      </span>
    </StButton>
  );
};

const StButton = styled.button<{ $relationType: relationType | undefined }>`
  ${B4}
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: var(--spacing_6);
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius_8);
  background-color: ${({ $relationType }) =>
    $relationType === "SELF"
      ? "var(--neutral_100)"
      : $relationType === "FRIEND"
      ? "var(--neutral_300)"
      : "var(--neutral_800)"};
  padding: var(--spacing_12);
  box-sizing: content-box;
  height: 16px;
  cursor: pointer;
  color: ${({ $relationType }) =>
    $relationType === "SELF" || $relationType === "STRANGER"
      ? "var(--black)"
      : "var(--white)"};
  transition: transform 0.02s ease-in-out, background-color 0.02s ease-in-out;

  &:active {
    background-color: var(--neutral_200);
    transform: scale(0.97);
  }
`;

export default FriendButton;
