import React, { useState } from "react";
import styled from "styled-components";
import arrowLeft from "@/image/icons/arrowLeft.svg";
import scrapActive from "@/image/icons/scrapActive.svg";
import scrapInactive from "@/image/icons/scrapInactive.svg";
import { useSearchParams } from "react-router-dom";
import useToastPopup from "@/utils/toastPopup";
import usePostMyPlace from "@/hooks/api/myPlace/usePostMyPlace";
import useDeleteMyPlace from "@/hooks/api/myPlace/useDeleteMyPlace";

interface SearchHeaderProps {
  onBack: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onBack }) => {
  const [isScraped, setIsScraped] = useState(false);
  const [searchParams] = useSearchParams();
  const kakaoPlaceId = searchParams.get("kakaoPlaceId");
  const toast = useToastPopup();
  const applyMyPlace = usePostMyPlace();
  const deleteMyPlace = useDeleteMyPlace();

  const scrapHandler = () => {
    if (kakaoPlaceId) {
      applyMyPlace.mutate({ kakaoPlaceId: Number(kakaoPlaceId) });
      toast("북마크 등록되었습니다.");
    }
  };

  return (
    <StHeaderContainer>
      <StBackButton onClick={onBack}>
        <img src={arrowLeft} alt="back" />
      </StBackButton>
      <StActionButtons>
        <button
          onClick={() => {
            setIsScraped(!isScraped);
            scrapHandler();
          }}
        >
          <img src={isScraped ? scrapActive : scrapInactive} alt="scrap" />
        </button>
      </StActionButtons>
    </StHeaderContainer>
  );
};

const StHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing_8) var(--spacing_20);
`;

const StBackButton = styled.button`
  border: none;
  width: 36px;
  height: 36px;
  border-radius: var(--radius_circle);
  flex-shrink: 0;
  background: var(--neutral_50);
  padding: 0;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

const StActionButtons = styled.div`
  display: flex;
  gap: var(--spacing_12);

  button {
    border: none;
    width: 40px;
    height: 40px;
    border-radius: var(--radius_circle);
    flex-shrink: 0;
    background: var(--neutral_50);
    padding: 0;
    cursor: pointer;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

export default SearchHeader;
