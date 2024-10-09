import React, { useState } from "react";
import styled from "styled-components";
import { B2 } from "../style/font";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, ...rest }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onChange) onChange(e);
  };

  return <StyledInput value={searchValue} onChange={handleChange} {...rest} />;
};

const StyledInput = styled.input`
  ${B2}
  background-color: var(--neutral_50);
  border: none;
  border-radius: var(--radius_circle);
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

export default SearchBar;
