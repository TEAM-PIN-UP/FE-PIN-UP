import { useState } from "react";
import styled from "styled-components";

interface SearchInputProps {
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <StyledInput
      type="text"
      value={searchValue}
      onChange={handleChange}
      placeholder="장소/가게 검색하기"
    />
  );
};

const StyledInput = styled.input`
  background-color: var(--neutral_50);
  border: none;
  border-radius: var(--radius_24);
  color: var(--black);
  flex: 1;
  font-size: 16px;
  gap: var(--spacing_12);
  outline: none;
  padding: var(--spacing_12);
  ::placeholder {
    color: var(--neutral_400);
  }
`;

export default SearchInput;
