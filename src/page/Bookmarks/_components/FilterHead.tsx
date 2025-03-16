import Chip from "@/components/Chip";
import ChevronDown from "@/image/icons/chevronDown.svg";
import coffee from "@/image/icons/coffee.svg";
import coffeeWhite from "@/image/icons/coffeeWhite.svg";
import food from "@/image/icons/food.svg";
import foodWhite from "@/image/icons/foodWhite.svg";
import { placeCategory, placeSort } from "@/interface/place";
import { B4, H6 } from "@/style/font";
import { useState } from "react";
import styled from "styled-components";

interface FilterProps {
  setSort: React.Dispatch<React.SetStateAction<placeSort>>;
  category: placeCategory;
  setCategory: React.Dispatch<React.SetStateAction<placeCategory>>;
}

const FilterHead: React.FC<FilterProps> = ({
  setSort,
  category,
  setCategory,
}) => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortType, setSortType] = useState<placeSort>("NEAR");

  const sortOptions = {
    NEAR: "가까운 순",
    LATEST: "최신 순",
    STAR_HIGH: "별점 높은 순",
    STAR_LOW: "별점 낮은 순",
  };

  return (
    <StChipContainer>
      <Chip selected={category === "ALL"} onClick={() => setCategory("ALL")}>
        전체
      </Chip>
      <Chip
        selected={category === "RESTAURANT"}
        onClick={() => setCategory("RESTAURANT")}
      >
        {category === "RESTAURANT" ? (
          <img src={foodWhite} />
        ) : (
          <img src={food} />
        )}
        <span>음식점</span>
      </Chip>
      <Chip selected={category === "CAFE"} onClick={() => setCategory("CAFE")}>
        {category === "CAFE" ? <img src={coffeeWhite} /> : <img src={coffee} />}
        <span>카페</span>
      </Chip>

      <div className="sortContainer">
        <StPickedContainer onClick={() => setShowSortMenu(!showSortMenu)}>
          <span className="pickedSort">{sortOptions[sortType]}</span>
          <img
            src={ChevronDown}
            style={{
              transform: showSortMenu ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease-in-out",
            }}
          />
        </StPickedContainer>

        {showSortMenu && (
          <SortMenu>
            {(Object.keys(sortOptions) as placeSort[]).map((type) => (
              <SortMenuItem
                key={type}
                selected={sortType === type}
                onClick={() => {
                  setSort(type);
                  setSortType(type);
                  setShowSortMenu(false);
                }}
              >
                {sortOptions[type]}
              </SortMenuItem>
            ))}
          </SortMenu>
        )}
      </div>
    </StChipContainer>
  );
};

const StChipContainer = styled.div`
  display: flex;
  gap: var(--spacing_12);
  align-items: center;
  padding: 16px 20px;
  box-sizing: border-box;
  .sortContainer {
    position: relative;
    margin-left: auto;
  }
`;

const StPickedContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
  .pickedSort {
    ${B4}
  }
  img {
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
  background: ${(props) =>
    props.selected ? "var(--neutral_100)" : "transparent"};
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

export default FilterHead;
