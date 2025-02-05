import chevronLeft from "@/image/icons/chevronLeft.svg";
import search from "@/image/icons/search.svg";
import xCircle from "@/image/icons/xCircle.svg";
import { B3 } from "@/style/font";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

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
    if (!inputValue) setIsFocused(false);
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
      )
        setIsFocused(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue]);

  const icon = !isFocused && !inputValue ? search : chevronLeft;
  const showClearIcon = inputValue.length > 0;

  return (
    <StDiv>
      <img className="icon" src={icon} />
      <StInput
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {showClearIcon && (
        <img className="clear" src={xCircle} onClick={handleClear} />
      )}
    </StDiv>
  );
};

const StDiv = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--neutral_50);
  border-radius: var(--radius_circle);
  padding: 0 var(--spacing_12);
  box-sizing: border-box;
  width: 100%;

  .icon {
    padding-right: var(--spacing_12);
  }

  .clear {
    cursor: pointer;
    padding: var(--spacing_10) var(--spacing_12);
  }
`;

const StInput = styled.input`
  ${B3}
  background-color: transparent;
  border: none;
  color: var(--black);
  flex: 1;
  outline: none;
  padding: var(--spacing_12) 0;
  width: 100%;
  ::placeholder {
    color: var(--neutral_400);
  }
`;

export default SearchBar;
