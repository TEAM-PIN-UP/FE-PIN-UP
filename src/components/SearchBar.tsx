import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import search from "@/image/icons/search.svg";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import xCircle from "@/image/icons/xCircle.svg";
import { B2 } from "@/style/font";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, ...rest }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!inputValue) {
      setIsFocused(false);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setIsFocused(false);
    if (onChange)
      onChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    if (inputRef.current) inputRef.current.blur();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        !inputValue
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue]);

  const icon = !isFocused && !inputValue ? search : chevronLeft;
  const showClearIcon = inputValue.length > 0;

  return (
    <StSearchBarContainer>
      <StIconWrapper>
        <img src={icon} alt="Search icon" />
      </StIconWrapper>
      <StInput
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {showClearIcon && (
        <StClear onClick={handleClear}>
          <img src={xCircle} alt="Clear search" />
        </StClear>
      )}
    </StSearchBarContainer>
  );
};

const StSearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--neutral_50);
  border-radius: var(--radius_circle);
  padding: 0 var(--spacing_12);
  box-sizing: border-box;
  width: 100%;
`;

const StIconWrapper = styled.div`
  display: flex;
  padding-right: var(--spacing_12);
`;

const StInput = styled.input`
  ${B2}
  background-color: transparent;
  border: none;
  color: var(--black);
  flex: 1;
  font-size: 16px;
  outline: none;
  padding: var(--spacing_12) 0;
  width: 100%;
  ::placeholder {
    color: var(--neutral_400);
  }
`;

const StClear = styled.div`
  display: flex;
  cursor: pointer;
  padding: var(--spacing_10) var(--spacing_12);
`;

export default SearchBar;
