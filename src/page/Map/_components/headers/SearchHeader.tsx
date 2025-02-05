import React, { useState } from "react";
import styled from "styled-components";

import Chip from "@/components/Chip";
import SearchBar from "@/components/SearchBar";
import ChevronDown from "@/image/icons/chevronDown.svg";
import coffee from "@/image/icons/coffee.svg";
import coffeeWhite from "@/image/icons/coffeeWhite.svg";
import food from "@/image/icons/food.svg";
import foodWhite from "@/image/icons/foodWhite.svg";
import { B4, H6 } from "@/style/font";
import { category, sort } from "@/interface/apiInterface";

interface SearchHeaderProps {
  sort: sort
  setSort: React.Dispatch<React.SetStateAction<sort>>
  category: category
  setCategory: React.Dispatch<React.SetStateAction<category>>
}

const SearchHeader = React.forwardRef<HTMLDivElement, SearchHeaderProps>((props, ref) => {
  const { sort, setSort, category, setCategory } = props;
  const [filter, setFilter] = useState<"all" | "food" | "cafe">("all");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortType, setSortType] = useState<sort>("NEAR");

  const sortOptions = {
    NEAR: "가까운 순",
    LATEST: "최신 순",
    STAR_HIGH: "별점 높은 순",
    STAR_LOW: "별점 낮은 순"
  };

  return (
    <HeaderDiv ref={ref}>
      <SearchContainer>
        <SearchBar placeholder="장소/가게 검색하기" />
      </SearchContainer>

      <ChipContainer>
        <Chip selected={category === "ALL"} onClick={() => setCategory("ALL")}>
          전체
        </Chip>
        <Chip selected={category === "RESTAURANT"} onClick={() => setCategory("RESTAURANT")}>
          {category === "RESTAURANT" ? <img src={foodWhite} /> : <img src={food} />}
          <span>음식점</span>
        </Chip>
        <Chip selected={category === "CAFE"} onClick={() => setCategory("CAFE")}>
          {category === "CAFE" ? <img src={coffeeWhite} /> : <img src={coffee} />}
          <span>카페</span>
        </Chip>

        <SortContainer>
          <StPickedContainer onClick={() => setShowSortMenu(!showSortMenu)}>
            <span className="pickedSort">{sortOptions[sortType]}</span>
            <img
              src={ChevronDown}
              style={{
                transform: showSortMenu ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease-in-out'
              }}
            />
          </StPickedContainer>

          {showSortMenu && (
            <SortMenu>
              {(Object.keys(sortOptions) as sort[]).map((type) => (
                <SortMenuItem
                  key={type}
                  selected={sortType === type}
                  onClick={() => {
                    setSort(type)
                    setSortType(type);
                    setShowSortMenu(false);
                  }}
                >
                  {sortOptions[type]}
                </SortMenuItem>
              ))}
            </SortMenu>
          )}
        </SortContainer>
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

const SortContainer = styled.div`
  position: relative;
  margin-left: auto;
`;

const StPickedContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
  .pickedSort{
    ${B4}
  }
  img{
    width: 18px;
    height: 18px;
  }
`;

const SortMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: var(--white);
  border-radius: var(--radius_12);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 140px;
`;

const SortMenuItem = styled.button<{ selected: boolean }>`
  ${H6}
  width: 100%;
  padding: var(--spacing_12);
  border: none;
  background: ${props => props.selected ? 'var(--neutral_100)' : 'transparent'};
  color: var(--neutral_800);
  text-align: left;
  cursor: pointer;
  display: block;

  &:hover {
    background: var(--neutral_50);
  }

  &:first-child {
    border-top-left-radius: var(--radius_12);
    border-top-right-radius: var(--radius_12);
  }

  &:last-child {
    border-bottom-left-radius: var(--radius_12);
    border-bottom-right-radius: var(--radius_12);
  }
`;

export default SearchHeader;