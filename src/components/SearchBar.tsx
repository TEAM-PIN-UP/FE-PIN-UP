import { useState } from "react";
import styled from "styled-components";
import { B2 } from "../style/font";

interface SearchInputProps {
  type?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  type = "text",
  onChange,
  placeholder,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <StyledInput
      type={type}
      value={searchValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

const StyledInput = styled.input`
  ${B2}
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
