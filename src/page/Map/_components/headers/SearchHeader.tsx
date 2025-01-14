import React, { useState } from "react";
import styled from "styled-components";

import Chip from "@/components/Chip";
import SearchBar from "@/components/SearchBar";
import ChevronDown from "@/image/icons/chevronDown.svg";
import coffee from "@/image/icons/coffee.svg";
import coffeeWhite from "@/image/icons/coffeeWhite.svg";
import food from "@/image/icons/food.svg";
import foodWhite from "@/image/icons/foodWhite.svg";
import { PlaceCategory } from "@/interface/place";
import { H6 } from "@/style/font";

const SearchHeader = React.forwardRef<HTMLDivElement, object>((_, ref) => {
  const [filter, setFilter] = useState<PlaceCategory>("ALL");

  return (
    <HeaderDiv ref={ref}>
      <SearchContainer>
        <SearchBar placeholder="장소/가게 검색하기" />
      </SearchContainer>

      <ChipContainer>
        <Chip selected={filter === "ALL"} onClick={() => setFilter("ALL")}>
          전체
        </Chip>
        <Chip
          selected={filter === "RESTAURANT"}
          onClick={() => setFilter("RESTAURANT")}
        >
          <img src={filter === "RESTAURANT" ? foodWhite : food} />
          <span>음식점</span>
        </Chip>
        <Chip selected={filter === "CAFE"} onClick={() => setFilter("CAFE")}>
          <img src={filter === "CAFE" ? coffeeWhite : coffee} />
          <span>카페</span>
        </Chip>

        <Sort>
          <span>가까운 순</span> <img src={ChevronDown} />
        </Sort>
      </ChipContainer>
    </HeaderDiv>
  );
});

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
  cursor: pointer;
  display: flex;
  gap: var(--spacing_4);
  padding: var(--spacing_4);
  margin-left: auto;
`;

export default SearchHeader;
