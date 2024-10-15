import React from "react";
import styled from "styled-components";

import Chip from "@/components/Chip";
import SearchBar from "@/components/SearchBar";
import { H6 } from "@/style/font";

const SearchHeader = React.forwardRef<HTMLDivElement, object>((_, ref) => {
  return (
    <HeaderDiv ref={ref}>
      <SearchContainer>
        <SearchBar placeholder="장소/가게 검색하기" />
      </SearchContainer>

      <ChipContainer>
        <Chip selected={true}>전체</Chip>
        <Chip>음식점</Chip>
        <Chip>카페</Chip>

        <Sort>가까운 순</Sort>
      </ChipContainer>
    </HeaderDiv>
  );
});

// Styled components for layout and styling
const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing_16);
  padding: var(--spacing_12);
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ChipContainer = styled.div`
  display: flex;
  gap: var(--spacing_12);
  align-items: center;
`;

const Sort = styled.button`
  ${H6}
  align-items: center;
  background: transparent;
  border: none;
  border-radius: var(--radius_12);
  color: var(--neutral_800);
  display: flex;
  cursor: pointer;
  padding: var(--spacing_4);
  margin-left: auto;
`;

export default SearchHeader;
