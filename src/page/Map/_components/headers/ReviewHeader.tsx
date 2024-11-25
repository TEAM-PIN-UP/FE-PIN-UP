import React, { useState } from "react";
import styled from "styled-components";

import arrowLeft from "@/image/icons/arrowLeft.svg";
import scrapActive from "@/image/icons/scrapActive.svg";
import scrapInactive from "@/image/icons/scrapInactive.svg";

interface SearchHeaderProps {
  onBack: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onBack }) => {
  const [isScraped, setIsScraped] = useState(false);

  return (
    <StHeaderContainer>
      <StBackButton onClick={onBack}>
        <img src={arrowLeft} alt="back" />
      </StBackButton>
      <StScrapButton onClick={() => setIsScraped(!isScraped)}>
        <img src={isScraped ? scrapActive : scrapInactive} alt="scrap" />
      </StScrapButton>
    </StHeaderContainer>
  );
};

const StHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing_20) var(--spacing_8);
`;

const StBackButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
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

const StScrapButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
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

export default SearchHeader;
